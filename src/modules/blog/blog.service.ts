import { Injectable } from '@nestjs/common';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { Model } from 'mongoose';
//import { Blog } from './blog.schema';
import { Blog } from './entities/blog.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel('blog')
    private readonly blogModel: Model<Blog>,
  ) {}

  async create(createBlogInput: CreateBlogInput) {
    try {
      const blog = await this.blogModel.create(createBlogInput);
      await blog.save();
      return {
        message: 'blog created successfully',
        success: true,
      };
    } catch (error) {
      return new Error(error.message);
    }
  }

  async findAll() {
    try {
      const blog = await this.blogModel.find();

      if (!blog) {
        return 'Blog not found';
      }
      return blog;
    } catch (error) {
      return new Error(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const blog = await this.blogModel.findOne({ _id: id }).exec();
      if (!blog) {
        return 'Blog not found';
      }
      return blog;
    } catch (error) {
      return new Error(error.message);
    }
  }

  update(id: string, updateBlogInput: UpdateBlogInput) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
