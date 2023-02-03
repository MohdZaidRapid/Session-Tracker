import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage, Multer } from 'multer';
import { join } from 'path';
import { Auth, GetUserId } from '../auth/auth.guard';
import { AuthService } from '../auth/auth.service';
import { BlogService } from '../blog/blog.service';
import { PortfolioService } from '../portfolio/portfolio.service';
import { SessionsService } from '../sessions/sessions.service';
import { Owner } from '../sessions/typeDef/resolver-type';
import { UploadsService } from './uploads.service';
import { editFileName, imageFileFilter } from './utils';

@Controller('uploads')
export class UploadsController {
  constructor(
    private readonly uploadService: UploadsService,
    private readonly authService: AuthService,
    private readonly sesssionService: SessionsService,
    private readonly blogService: BlogService,
    private readonly portfolioService: PortfolioService,
  ) {}

  /**
   * @description upload images onmongodb database
   * @param files sessionId
   * @returns message success
   */
  //@author mohdzaid

  @Post('uploadAsset/:sessionId')
  @Auth()
  @UseInterceptors(
    // created interceptor for reading saving file in local storage.
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './src/modules/uploads/files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadAFile(
    @UploadedFile() file: Multer.File,
    @Param('sessionId') sessionId,
    @GetUserId() user,
  ) {
    try {
      const session = await this.sesssionService.getSessionByOnwerId(sessionId);
      if (session.owner !== user._id.toString()) {
        throw new Error("you can't upload image to this id");
      }
      const { originalname, filename, filepath } =
        await this.uploadService.uploadAFile(file);
      await this.sesssionService.uploadImage({
        _id: sessionId,
        headerImage: filepath,
      });
      return {
        message: 'session image uploaded successfully',
        success: true,
      };
    } catch (error) {
      return {
        message: error.message,
        success: false,
      };
    }
  }

  /**
   * @description upload images on database
   * @param files blogId
   * @returns message success
   */
  //@author mohdzaid
  @Post('/bannerimage/:blogId')
  @Auth()
  @UseInterceptors(
    // created interceptor for reading saving file in local storage.
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './src/modules/uploads/files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadBannerImage(
    @UploadedFile() file: Multer.File,
    @Param('blogId') blogId,
    @GetUserId() user,
  ) {
    try {
      const blog = await this.blogService.getBlogById(blogId);
      if (blog.owner !== user._id.toString()) {
        throw new Error(
          'you are not authorized to upload this image to this id',
        );
      }
      const { originalname, filename, filepath } =
        await this.uploadService.uploadAFile(file);
      await this.blogService.uploadBannerImage({
        id: blogId,
        bannerImage: filepath,
      });
      return {
        message: 'Blog image uploaded successfully',
        success: true,
      };
    } catch (error) {
      return {
        message: error.message,
        success: false,
      };
    }
  }

  /**
   * @description upload images on database
   * @param files portfolio Id
   * @returns message success
   */
  //@author mohdzaid
  @Post('/portfolio-image/:portfolioId')
  @Auth()
  @UseInterceptors(
    // created interceptor for reading saving file in local storage.
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './src/modules/uploads/files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadPortfolioImage(
    @UploadedFile() file: Multer.File,
    @Param('portfolioId') portfolioId,
    @GetUserId() user,
  ) {
    try {
      const portfolio = await this.portfolioService.getPortfolioById({
        id: portfolioId,
      });
      if (portfolio.user !== user._id.toString()) {
        throw new Error(
          'you are not authorized to upload this image to this id',
        );
      }
      const { originalname, filename, filepath } =
        await this.uploadService.uploadAFile(file);
      await this.portfolioService.uploadPortfolioImage({
        id: portfolioId,
        image: filepath,
      });
      return {
        message: 'Portfolio image uploaded successfully',
        success: true,
      };
    } catch (error) {
      return {
        message: error.message,
        success: false,
      };
    }
  }

  /**
   * @description get al images of blogs you want database
   * @param files imagename
   * @returns image you want
   */
  //@author mohdzaid
  @Get('/get-portfolio-image/:portfolioId')
  // @Auth()
  async getPortfolioImage(@Res() res, @Param('portfolioId') portfolioId) {
    const portfolio = await this.portfolioService.getPortfolioImageById({
      portfolioId: portfolioId,
    });
    if (!portfolio) {
      throw new Error('no portfolio found wuth this id');
    }
    if (portfolio.image) {
      const url = 'localhost:3000/';
      const image = url + portfolio.image;
      res.send(image);
    }
  }

  /**
   * @description upload images on database
   * @param files portfolio Id
   * @returns message success
   */
  //@author mohdzaid
  @Post('/portfolio-banner/:portfolioId')
  @Auth()
  @UseInterceptors(
    // created interceptor for reading saving file in local storage.
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './src/modules/uploads/files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadPortfolioBannerImage(
    @UploadedFile() file: Multer.File,
    @Param('portfolioId') portfolioId,
    @GetUserId() user,
  ) {
    try {
      const portfolio = await this.portfolioService.getPortfolioById({
        id: portfolioId,
      });
      if (portfolio.user !== user._id.toString()) {
        throw new Error(
          'you are not authorized to upload this image to this id',
        );
      }
      const { originalname, filename, filepath } =
        await this.uploadService.uploadAFile(file);
      await this.portfolioService.uploadPortfolioBannerImage({
        id: portfolioId,
        banner: filepath,
      });
      return {
        message: 'Portfolio banner image uploaded successfully',
        success: true,
      };
    } catch (error) {
      return {
        message: error.message,
        success: false,
      };
    }
  }

  /**
   * @description upload images on mongodb database
   * @param files sessionId
   * @returns message success
   */
  //@author mohdzaid
  @Post('/multiple/:blogId')
  @Auth()
  @UseInterceptors(
    // created interceptor for reading saving file in local storage.
    FilesInterceptor('files', 20, {
      storage: diskStorage({
        destination: './src/modules/uploads/files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadFiles(
    @UploadedFiles() files,
    @GetUserId() user,
    @Param('blogId') blogId,
  ) {
    try {
      const blog = await this.blogService.getBlogById(blogId);
      if (blog.owner !== user._id.toString()) {
        throw new Error(
          'you are not authorized to upload this image to this id',
        );
      }
      const response = await this.uploadService.uploadFiles(files);
      let fileName = response.map((file) => {
        return file.filepath;
      });
      await this.blogService.uploadArrayOfImage({
        id: blogId,
        imageArr: fileName,
      });

      return {
        message: 'Images uploaded successfully',
        success: true,
      };
    } catch (error) {
      return {
        error: error.message,
        success: false,
      };
    }
  }

  // /**
  //  * @description upload images on mongodb database
  //  * @param files imagename
  //  * @returns image you want
  //  */
  // //@author mohdzaid
  // @Get('/get-image/:imagename')
  // @Auth()
  // async getImage(@Param('imagename') imagename, @Res() res) {
  //   // const image = join(process.cwd(), 'src/modules/uploads/files/' + imagename);
  //   const image = join('localhost:3000/' + imagename);
  //   res.send(image);
  // }

  // /**
  //  * @description get al images of blogs you want database
  //  * @param files imagename
  //  * @returns image you want
  //  */
  // //@author mohdzaid
  // @Get('/get-images/:blogId')
  // // @Auth()
  // async getImages(@Res() res, @Param('blogId') blogId) {
  //   const imagesArr = await this.blogService.getAllImagesArr(blogId);
  //   const allImages = imagesArr.map((img) => {
  //     const url = 'localhost:3000/';
  //     const images = url + img;
  //     return images;
  //   });
  //   res.send(allImages);
  // }
}
