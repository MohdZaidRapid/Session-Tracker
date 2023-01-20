import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogService } from '../blog/blog.service';
import { BlogDto } from '../blog/dto/blog.dto';
import { CreatePortfolioDto } from './dto/createportfolio.dto';
import { Portfolio } from './interface/portfolio.interface';

@Injectable()
export class PortfolioService {
  constructor(
    private readonly blogService: BlogService,
    @InjectModel('portfolio') private readonly portfolioModel: Model<Portfolio>,
  ) {}

  /**
   * @description create Portfolio  for currently existing user
   * @param createPortfolioDto {
   *        name
          expertise
          courses
          blogs
          descrtiption
          email
          phone
          website
          location
          company
          banner
          image
          expert
}
   * @returns {message success}
   */
  // author MohdZaid

  async createPortfolio(createPortfolioDto) {
    let blogs;
    blogs = await this.blogService.findAllBlog({
      owner: createPortfolioDto.user,
    });

    let dto: CreatePortfolioDto = {
      blogs,
      ...createPortfolioDto,
    };
    console.log('array', createPortfolioDto);
    const portfolio = await this.portfolioModel.create(dto);
    if (!portfolio) {
      throw new NotFoundException(
        "can't create portfolio something went wrong",
      );
    }
    console.log(portfolio);
    await portfolio.save();

    return {
      message: 'Your portfolio created successfully',
      success: true,
    };
  }
}
