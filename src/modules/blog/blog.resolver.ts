import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BlogService } from './blog.service';

import { CreateBlogDto, GetBlogByIdDto } from './dto/blog.dto';
import { UpdateBlogInput } from './dto/update-dto';
import { MessageDef } from '../sessions/typeDef/resolver-type';
import { Blog, BlogByIdDef } from './typeDef/resolver-type';

@Resolver(() => Blog)
export class BlogResolver {
  constructor(private readonly blogService: BlogService) {}

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

  @Mutation(() => Blog)
  updateBlog(@Args('updateBlogInput') updateBlogInput: UpdateBlogInput) {
    return this.blogService.update(updateBlogInput._id, updateBlogInput);
  }

  /*
  

  @Mutation(() => Blog)
  removeBlog(@Args('id', { type: () => Int }) id: number) {
    return this.blogService.remove(id);
  }
  */
}
