import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { profile } from 'console';
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

  async updatePortfolio(dto) {
    try {
      let portfolio = await this.portfolioModel.findOne({
        _id: dto.id,
      });
      if (!portfolio) {
        throw new Error('no portfolio found');
      }

      if (portfolio.user !== dto.user._id.toString()) {
        throw new Error("you can't update this portfolio");
      }
      if (dto.user) {
        delete dto.user;
      }

      if (dto.courses) {
        let index = dto.index;
        let course = dto.course;
        await this.portfolioModel.findOneAndUpdate(
          { _id: dto.id, 'courses.index': index },
          { $set: { 'courses.$.course': course } },
          {
            new: true,
          },
        );
      }

      await this.portfolioModel.findOneAndUpdate(
        dto.id,
        { $set: dto },
        {
          new: true,
        },
      );

      return {
        message: 'Your profile updated',
        success: true,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getAllPortfolio(getAllPortFolioDto) {
    try {
      const getAllPortofolios = await this.portfolioModel
        .find()
        .sort({ expert: 1 });

      return getAllPortofolios;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getExpertPortfolio({ id }) {
    try {
      const expertPortfolio = await this.portfolioModel.findOne({
        _id: id,
        expert: true,
      });
      if (!expertPortfolio) {
        throw new Error('No Expert Portfolio found with this id');
      }

      return expertPortfolio;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
