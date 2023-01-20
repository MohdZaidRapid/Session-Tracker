import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BlogService } from './blog.service';

import {
  CreateContentDto,
  CreateBlogDto,
  GetBlogByIdDto,
  CommentsDto,
} from './dto/blog.dto';
import { MessageDef } from '../sessions/typeDef/resolver-type';
import { Blog, BlogByIdDef, ContentDef } from './typeDef/resolver-type';
import { Auth, GetUserId } from '../auth/auth.guard';

@Resolver(() => Blog)
export class BlogResolver {
  constructor(private readonly blogService: BlogService) {}

  @Auth()
  @Mutation(() => MessageDef, { name: 'createContent' })
  async createContent(
    @Args('input') createContentDto: CreateContentDto,
    @GetUserId() user,
  ) {
    const data = await this.blogService.createContent(createContentDto);
    return data;
  }

  @Query(() => [ContentDef], { name: 'listAllContent' })
  async listAllContent() {
    const data = await this.blogService.listAllContent();
    return data;
  }

  @Auth()
  @Mutation(() => MessageDef, { name: 'createBlog' })
  async createBlog(
    @Args('input') createBlogDto: CreateBlogDto,
    @GetUserId() user,
  ) {
    createBlogDto.owner = user._id;
    const data = await this.blogService.create(createBlogDto);
    return data;
  }

  @Auth()
  @Query(() => [Blog], { name: 'getAllBlogs' })
  async findAll() {
    return await this.blogService.findAllBlog();
  }

  @Auth()
  @Query(() => BlogByIdDef, { name: 'getBlogById' })
  async findOne(@Args('input') getBlogByIdDto: GetBlogByIdDto) {
    return await this.blogService.findOne(getBlogByIdDto);
  }

  @Auth()
  @Mutation(() => MessageDef, { name: 'addComment' })
  async addComment(@Args('input') commentsDto: CommentsDto,@GetUserId() user) {
    commentsDto.email=user.email;
    commentsDto.name=user.username
    
    return await this.blogService.addComment(commentsDto);
  }
}
