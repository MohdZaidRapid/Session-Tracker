import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContentDto, CreateBlogDto } from './dto/blog.dto';
import { UpdateBlogInput } from './dto/update-dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from './interface/blog.interface';
import { Content } from './interface/contents.interface';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel('blog')
    private readonly blogModel: Model<Blog>,
    @InjectModel('content')
    private readonly contentModel: Model<Content>,
  ) {}

  async createContent(createContentDto: CreateContentDto) {
    try {
      const content = await this.contentModel.create(createContentDto);
      if (!content) {
        throw new Error("can't create content something went wrong");
      }
      await content.save();
      return {
        message: 'content created successfully',
        success: true,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
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
        throw new NotFoundException('No Blog found with this id');
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
