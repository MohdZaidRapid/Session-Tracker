import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/blog.dto';
import { UpdateBlogInput } from './dto/update-dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from './interface/blog.interface';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel('blog')
    private readonly blogModel: Model<Blog>,
  ) {}

  async create(createBlogDto: CreateBlogDto) {
    try {
      const blog = await this.blogModel.create(createBlogDto);
      await blog.save();
      return {
        message: 'blog created successfully',
        success: true,
      };
    } catch (error) {
      return new Error(error.message);
    }
  }

  async findAllBlog() {
    try {
      const blog = await this.blogModel.find();

      if (!blog) {
        throw new NotFoundException('Blog not found');
      }
      return blog;
    } catch (error) {
      return new Error(error.message);
    }
  }

  async findOne({ id }) {
    try {
      const blog = await this.blogModel.findOne({ _id: id });
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
