import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateContentDto,
  CreateBlogDto,
  BannerImageDto,
} from './dto/blog.dto';
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
  async createBlog(createBlogDto: CreateBlogDto) {
    try {
      const blog = await this.blogModel.create(createBlogDto);
      await blog.save();
      return {
        message: 'blog created successfully',
        success: true,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * @description get list of  all Bolg array of object
   * @param  {NoParam}
   * @returns { _id banner Image category createdAt description title }
   */
  // author MohdZaid
  async findAllBlog(blogDto) {
    try {
      let query: any = {};
      if (blogDto._id) {
        query._id = blogDto._id;
      }
      if (blogDto.owner) {
        query.owner = blogDto.owner;
      }

      const blog = await this.blogModel.find(query).populate('owner');
      if (!blog || blog.length <= 0) {
        throw new NotFoundException('Blog not found');
      }
      return blog;
    } catch (error) {
      throw new Error(error.message);
    }
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
  async findBlogById({ id }) {
    try {
      const blog = await this.blogModel.findById(id).populate('owner');
      if (!blog) {
        throw new NotFoundException('No Blog found with this id');
      }
      return blog;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * @description add comment to blog post
   * @param param0 {id name email message}
   * @returns {message ,success}
   */
  //author MohdZaid
  async addComment({ id, message, email, name }) {
    try {
      await this.blogModel.findOneAndUpdate(
        { _id: id },
        { $push: { comments: { name, email, message } } },
        { new: true },
      );

      return {
        message: 'comment added successfully',
        success: true,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * @description find blogs by Multiple ids of array
   * @param param0 [ids]
   * @returns {array of  blogs object}
   */
  //author MohdZaid
  async findBlogByIds(idsArray) {
    try {
      const blogsArray = await this.blogModel.find({
        _id: { $in: idsArray },
      });
      return blogsArray;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * @description uploadImage
   * @param param0 [blogId]
   * @returns {sucess,message}
   */
  //author MohdZaid
  async uploadBannerImage(bannerImageDto: BannerImageDto) {
    try {
      const { bannerImage, id } = bannerImageDto;
      await this.blogModel.findByIdAndUpdate(id, {
        $set: { bannerImage: bannerImage },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * @description get blog by id
   * @param param0 [blogId]
   * @returns {sucess,message}
   */
  //author MohdZaid
  async getBlogById(blogId) {
    const blog = await this.blogModel.findById(blogId);
    if (!blog) {
      throw new Error('No blog found');
    }
    return blog;
  }

  /**
   * @description get blog and push array of images
   * @param param0 [blogId,imageArr]
   */
  //author MohdZaid

  async uploadArrayOfImage({ id, imageArr }) {
    await Promise.all(
      imageArr.map(async (img) => {
        await this.blogModel.findByIdAndUpdate(
          id,
          {
            $push: { 'subContent.0.images': img },
          },
          { new: true },
        );
      }),
    );
  }

  async getAllImagesArr(blogId) {
    try {
      const imgArr = await this.blogModel.findOne({ _id: blogId });
      if (!imgArr) {
        throw new Error('No images found');
      }
      const images = imgArr.subContent[0].images;
      return images;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
