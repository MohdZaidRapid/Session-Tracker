import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BlogService } from './blog.service';

import {
  CreateContentDto,
  CreateBlogDto,
  GetBlogByIdDto,
  CommentsDto,
  BlogDto,
  GetAllPortfolioDto,
} from './dto/blog.dto';
import { MessageDef } from '../sessions/typeDef/resolver-type';
import { Blog, BlogByIdDef, ContentDef } from './typeDef/resolver-type';
import { Auth, GetUserId } from '../auth/auth.guard';

@Resolver(() => Blog)
export class BlogResolver {
  constructor(private readonly blogService: BlogService) {}

  /**
   * @description create content for Content for title
   * @param createContentDto {title}
   * @returns {message success}
   */
  // author MohdZaid
  @Auth()
  @Mutation(() => MessageDef, { name: 'createContent' })
  async createContent(
    @Args('input') createContentDto: CreateContentDto,
    @GetUserId() user,
  ) {
    const data = await this.blogService.createContent(createContentDto);
    return data;
  }
  /**
   * @description get list of  all content array
   * @param createContentDto {NoParam}
   * @returns {title  _id}
   */
  // author MohdZaid
  @Query(() => [ContentDef], { name: 'listAllContent' })
  async listAllContent() {
    const data = await this.blogService.listAllContent();
    return data;
  }

  /**
   * @description create blog 
   * @param createBlogDto {title
   *  bannerImage 
   * owner 
   * category
    description
    subContent=>{
      title
        content
      images}}
   * @returns {message,success}
   */
  //author Mohd Zaid
  @Auth()
  @Mutation(() => MessageDef, { name: 'createBlog' })
  async createBlog(
    @Args('input') createBlogDto: CreateBlogDto,
    @GetUserId() user,
  ) {
    createBlogDto.owner = user._id;
    const data = await this.blogService.createBlog(createBlogDto);
    return data;
  }

  /**
   * @description get list of  all Bolg array of object
   * @param  {NoParam}
   * @returns { _id banner Image category createdAt description title }
   */
  // author MohdZaid
  @Query(() => [Blog], { name: 'getAllBlogs' })
  async findAll(@Args('input') blogDto: BlogDto) {
    return await this.blogService.findAllBlog(blogDto);
  }

  /**
   * @description get list of  all Bolg array of object
   * @param  {NoParam}
   * @returns {  _id
    bannerImage
    category
    comments {
      date
      email
      message
      name
    }
    createdAt
    description
    owner
    subContent {
      content
      images
      title
    }
    title
  }}
   */
  // author MohdZaid
  @Auth()
  @Query(() => BlogByIdDef, { name: 'getBlogById' })
  async findOne(@Args('input') getBlogByIdDto: GetBlogByIdDto) {
    return await this.blogService.findBlogById(getBlogByIdDto);
  }

  /**
   * @description add comment to blog post
   * @param param0 {id name email message}
   * @returns {message ,success}
   */
  //author MohdZaid
  @Auth()
  @Mutation(() => MessageDef, { name: 'addComment' })
  async addComment(@Args('input') commentsDto: CommentsDto, @GetUserId() user) {
    commentsDto.email = user.email;
    commentsDto.name = user.username;

    return await this.blogService.addComment(commentsDto);
  }
}
