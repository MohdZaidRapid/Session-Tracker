import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { profile } from 'console';
import { Model } from 'mongoose';
import { BlogService } from '../blog/blog.service';
import { BlogDto } from '../blog/dto/blog.dto';
import {
  CreatePortfolioDto,
  GetPortfolioByIdDto,
  PortfolioBannerDto,
  PortfolioImageDto,
} from './dto/createportfolio.dto';
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
    const user = await this.portfolioModel.findOne({
      user: createPortfolioDto.user,
    });

    if (user) {
      await this.portfolioModel.findOneAndUpdate(
        { user: createPortfolioDto.user },
        { $set: createPortfolioDto },
        { new: true },
      );

      return {
        message: 'Your portfolio updated successfully',
        success: true,
      };
    } else {
      const portfolio = await this.portfolioModel.create(createPortfolioDto);
      await portfolio.save();
      return {
        message: 'Your portfolio created successfully',
        success: true,
      };
    }
  }

  // /**
  //  * @description updateportfolio of the user
  //  * @param dto {name
  //         expertise
  //         courses
  //         descrtiption
  //         email
  //         phone
  //         website
  //         location
  //         company
  //         banner
  //         image
  //         expert}
  //  * @returns
  //  */
  // async updatePortfolio(dto) {
  //   try {
  //     let portfolio = await this.portfolioModel.findOne({
  //       _id: dto.id,
  //     });
  //     if (!portfolio) {
  //       throw new NotFoundException('no portfolio found');
  //     }

  //     if (portfolio.user !== dto.user._id.toString()) {
  //       throw new Error("you can't update this portfolio");
  //     }
  //     if (dto.user) {
  //       delete dto.user;
  //     }

  //     if (dto.courses) {
  //       let index = dto.index;
  //       let course = dto.course;
  //       await this.portfolioModel.findOneAndUpdate(
  //         { _id: dto.id, 'courses.index': index },
  //         { $set: { 'courses.$.course': course } },
  //         {
  //           new: true,
  //         },
  //       );
  //     }

  //     await this.portfolioModel.findOneAndUpdate(
  //       dto.id,
  //       { $set: dto },
  //       {
  //         new: true,
  //       },
  //     );

  //     return {
  //       message: 'Your profile updated',
  //       success: true,
  //     };
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
  // }
  /**
   * @description getAllportfolio default sort by expert true
   * @param getAllPortFolioDto{NoParams}
   * @returns array of object of portfolio {
   * name
   * image
   * courses
   * description
   * }
   */
  async getAllPortfolio(getAllPortFolioDto) {
    try {
      // const sort =
      // const getAllTruePortofolios = await this.portfolioModel.find({
      //   expert: true,
      // });
      // const getAllFalselPortofolios = await this.portfolioModel.find({
      //   expert: false,
      // });
      const getAllPortfolios = await this.portfolioModel
        .find({
          $or: [{ expert: true }, { expert: false }],
        })
        .sort({ expert: -1 });
      return getAllPortfolios;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * @description getAllportfolio default sort by expert true
   * @param GetExpertPortfolioDto{id}
   * @returns array of object of portfolio {
   * name
   * image
   * courses
   * description
   * }
   */
  async getExpertPortfolio({ id }) {
    try {
      const expertPortfolio = await this.portfolioModel.findOne({
        _id: id,
        expert: true,
      });
      if (!expertPortfolio) {
        throw new NotFoundException('No Expert Portfolio found with this id');
      }

      return expertPortfolio;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * @description upload portfolio image
   * @param {id}GetPortfolioByIdDto
   * @returns {message success}
   * }
   */
  async getPortfolioById(getPortfolioByIdDto: GetPortfolioByIdDto) {
    try {
      const { id } = getPortfolioByIdDto;
      const portfolio = await this.portfolioModel.findById(id);
      if (!portfolio) {
        throw new NotFoundException('No portfolio found with this id ');
      }
      return portfolio;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * @description upload portfolio image
   * @param PortfolioImageDto{image}
   * @returns {message success}
   * }
   */

  async uploadPortfolioImage(portfolioImageDto: PortfolioImageDto) {
    try {
      const { image, id } = portfolioImageDto;
      await this.portfolioModel.findByIdAndUpdate(id, {
        $set: { image: image },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * @description upload portfolio image
   * @param PortfolioImageDto{image}
   * @returns {message success}
   * }
   */

  async uploadPortfolioBannerImage(portfolioBannerDto: PortfolioBannerDto) {
    try {
      const { banner, id } = portfolioBannerDto;
      await this.portfolioModel.findByIdAndUpdate(id, {
        $set: { banner: banner },
      });
    } catch (error) {
      throw new Error(error.messge);
    }
  }

  async getPortfolioImageById({ portfolioId }) {
    try {
      const portfolio = await this.portfolioModel.findOne({ _id: portfolioId });
      if (!portfolio) {
        throw new Error('No portfolio found with this id');
      }
      return portfolio;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
