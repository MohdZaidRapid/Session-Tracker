import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BlogService } from './blog.service';

import {
  CreateContentDto,
  CreateBlogDto,
  GetBlogByIdDto,
} from './dto/blog.dto';
import { UpdateBlogInput } from './dto/update-dto';
import { MessageDef } from '../sessions/typeDef/resolver-type';
import { Blog, BlogByIdDef, ContentDef } from './typeDef/resolver-type';

@Resolver(() => Blog)
export class BlogResolver {
  constructor(private readonly blogService: BlogService) {}

  @Mutation(() => MessageDef)
  async createContent(
    @Args('createContent') createContentDto: CreateContentDto,
  ) {
    const data = await this.blogService.createContent(createContentDto);
    return data;
  }

  @Query(() => [ContentDef], { name: 'listAllContent' })
  async listAllContent() {
    const data = await this.blogService.listAllContent();
    return data;
  }

  @Mutation(() => MessageDef)
  async createBlog(@Args('createBlog') createBlogDto: CreateBlogDto) {
    const data = await this.blogService.create(createBlogDto);
    return data;
  }

  @Query(() => [Blog], { name: 'getAllblog' })
  findAll() {
    return this.blogService.findAllBlog();
  }

  @Query(() => BlogByIdDef, { name: 'getBlogById' })
  findOne(@Args('input') getBlogByIdDto: GetBlogByIdDto) {
    return this.blogService.findOne(getBlogByIdDto);
  }
}
