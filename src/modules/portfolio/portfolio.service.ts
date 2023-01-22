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
    let portfolio;
    portfolio = await this.portfolioModel.create(createPortfolioDto);
    if (!portfolio) {
      throw new NotFoundException(
        "can't create portfolio something went wrong",
      );
    }
    await portfolio.save();
    return {
      message: 'Your portfolio created successfully',
      success: true,
    };
  }

  async updatePortfolio({ user, updatePortfolioDto }) {
    try {
      let portfolio = await this.portfolioModel.findOne({
        _id: updatePortfolioDto.id,
      });
      if (!portfolio) {
        throw new Error('no portfoilio found');
      }
      if (portfolio.user !== user._id) {
        throw new Error("you can't update this portfolio");
      }

      await this.portfolioModel.updateOne(
        updatePortfolioDto.id,
        updatePortfolioDto,
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
