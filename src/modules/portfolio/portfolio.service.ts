import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Portfolio } from './interface/portfolio.interface';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectModel('portfolio') private readonly portfolioMode: Model<Portfolio>,
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
    const portfolio = await this.portfolioMode.create(createPortfolioDto);
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


  
}
