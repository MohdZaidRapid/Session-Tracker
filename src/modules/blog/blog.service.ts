import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContentDto, CreateBlogDto } from './dto/blog.dto';
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

  /**
   * @description create content for Content for title
   * @param createContentDto {title}
   * @returns {message success}
   */
  // author MohdZaid
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

  /**
   * @description get list of  all content array
   * @param createContentDto {NoParam}
   * @returns {title  _id}
   */
  // author MohdZaid
  async listAllContent() {
    try {
      const content = await this.contentModel.find();
      return content;
    } catch (error) {
      throw new Error(error.message);
    }
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

  /**
   * @description get list of  all Bolg array of object
   * @param  {NoParam}
   * @returns { _id banner Image category createdAt description title }
   */
  // author MohdZaid
  async findAllBlog() {
    try {
      const blog = await this.blogModel.find();

      if (!blog || blog.length <= 0) {
        throw new NotFoundException('Blog not found');
      }
      return blog;
    } catch (error) {
      return new Error(error.message);
    }
  }
  /**
   * @description get list of  all Bolg array of object
   * @param createContentDto {NoParam}
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
  async findOne({ id }) {
    try {
      const blog = await this.blogModel.findById(id);
      if (!blog) {
        throw new NotFoundException('No Blog found with this id');
      }
      return blog;
    } catch (error) {
      return new Error(error.message);
    }
  }

  /**
   * @description add comment to blog post
   * @param param0 {id name email message}
   * @returns {message ,success}
   */
  //author MohdZaid
  async addComment({ id, name, email, message }) {
    await this.blogModel.findOneAndUpdate(
      { _id: id },
      { $push: { comments: { name, email, message } } },
      { new: true },
    );

    return {
      message: 'comment added successfully',
      success: true,
    };
  }
}
