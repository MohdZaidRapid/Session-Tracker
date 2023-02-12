import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
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
// import { Auth, GetUserId } from '../auth/auth.guard';
import { Auth, GetUserId } from '../auth/rest-auth.guards';
import { AuthService } from '../auth/auth.service';
import { BlogService } from '../blog/blog.service';
import { PortfolioService } from '../portfolio/portfolio.service';
import { SessionsService } from '../sessions/sessions.service';
import { Owner } from '../sessions/typeDef/resolver-type';
import { UploadsService } from './uploads.service';
import { editFileName, imageFileFilter, videoFileFilter } from './utils';

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

  @Post('upload-session-image/:sessionId')
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
      if (!file) {
        throw new Error('no file name found');
      }
      const session = await this.sesssionService.getSessionByOnwerId(sessionId);
      if (session.owner !== user._id.toString()) {
        throw new Error("you can't upload image to this id");
      }
      const { originalname, filename, filepath } =
        await this.uploadService.uploadAFile(file);
      await this.sesssionService.uploadImage({
        _id: sessionId,
        headerImage: filename,
      });
      return {
        message: 'session image uploaded successfully',
        success: true,
      };
    } catch (error) {
      console.log(error, 'errororr');
      return {
        error: error.message,
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
      if (!file) {
        throw new Error('no file found.Please provide image to upload');
      }
      const { originalname, filename, filepath } =
        await this.uploadService.uploadAFile(file);
      await this.blogService.uploadBannerImage({
        id: blogId,
        bannerImage: filename,
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
      if (!file) {
        throw new Error('no file found.Please provide image to upload');
      }
      const { originalname, filename, filepath } =
        await this.uploadService.uploadAFile(file);
      await this.portfolioService.uploadPortfolioImage({
        id: portfolioId,
        image: filename,
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
  @Auth()
  async getPortfolioImage(@Res() res, @Param('portfolioId') portfolioId) {
    try {
      const portfolio = await this.portfolioService.getPortfolioImageById({
        portfolioId: portfolioId,
      });
      if (!portfolio || !portfolio.image) {
        throw new Error('no portfolio or image found with this id');
      }
      const url = 'localhost:3000/';
      const image = url + portfolio.image;
      res.status(201).send(image);
    } catch (err) {
      res.status(404).send(err.message);
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
      if (!file) {
        throw new Error('no file found.Please provide image to upload');
      }
      const { originalname, filename, filepath } =
        await this.uploadService.uploadAFile(file);
      await this.portfolioService.uploadPortfolioBannerImage({
        id: portfolioId,
        banner: filename,
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
  @Post('/multiple-blog-image/:blogId')
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
      if (!blog) {
        throw new Error('no blog found');
      }
      if (blog.owner !== user._id.toString()) {
        throw new Error(
          'you are not authorized to upload this image to this id',
        );
      }
      if (!files) {
        throw new Error('no file found.Please provide image to upload');
      }
      const response = await this.uploadService.uploadFiles(files);
      let fileName = response.map((file) => {
        return file.filename;
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
      // res.status(400).send({ message: error.message, success: false });
      return {
        message: error.message,
        succees: false,
      };
    }
  }

  /**
   * @description upload images on mongodb database
   * @param files imagename
   * @returns image you want
   */
  //@author mohdzaid
  @Get('/get-image/:imagename')
  @Auth()
  async getImage(@Param('imagename') imagename, @Res() res) {
    try {
      const image = join('localhost:3000/' + imagename);
      res.send(image);
    } catch (err) {
      console.log('err', err, 'err');
      return {
        message: err.message,
      };
    }
    // const image = join(process.cwd(), 'src/modules/uploads/files/' + im  agename);
  }

  /**
   * @description get al images of blogs you want database
   * @param files imagename
   * @returns image you want
   */
  //@author mohdzaid
  @Get('/get-blog-images/:blogId')
  @Auth()
  async getImages(@Res() res, @Param('blogId') blogId) {
    try {
      const imagesArr = await this.blogService.getAllImagesArr(blogId);
      if (!imagesArr) {
        throw new Error('No image found');
      }
      const allImages = imagesArr.map((img) => {
        const url = 'localhost:3000/';
        const images = url + img;
        return images;
      });
      res.send(allImages);
    } catch (error) {
      res.status(400).send({ message: error.message, success: false });
    }
  }

  /**
   * @description get al images of blogs you want database
   * @param files imagename
   * @returns image you want
   */
  //@author mohdzaid
  @Get('/get-banner-image/:portfolioId')
  @Auth()
  async bannerImage(@Res() res, @Param('portfolioId') portfolioId) {
    try {
      const portfolio = await this.portfolioService.getPortfolioImageById({
        portfolioId: portfolioId,
      });
      if (!portfolio) {
        return {
          message: 'not found',
        };
      }
      const url = 'localhost:3000/';
      const image = url + portfolio.image;
      res.status(200).send({
        image,
        success: true,
      });
    } catch (error) {
      res.status(400).send({ message: error.message, success: false });
    }
  }

  @Post('/uploadvideo/:sessionId')
  @Auth()
  @UseInterceptors(
    // created interceptor for reading saving file in local storage.
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './src/modules/uploads/files',
        filename: editFileName,
      }),
      fileFilter: videoFileFilter,
    }),
  )
  async findSessionByIdAndUpdate(
    @UploadedFile() file,
    @GetUserId() user,
    @Param('sessionId') sessionId,
  ) {
    try {
      if (!file) {
        throw new Error('no file found');
      }

      const session = await this.sesssionService.findSessionByIdAndUpdate({
        id: sessionId,
        video: file.filename,
      });
      if (!session || !session.owner) {
        throw new Error('no session found with this id');
      }
      if (session.owner !== user._id.toString()) {
        throw new Error("you can't upload image to this id");
      }
      return {
        success: true,
        message: 'video uploaded successfully',
      };
    } catch (err) {
      return {
        error: err.message,
        success: false,
      };
    }
  }

  @Get('/get-video/:sessionId')
  @Auth()
  async getVideo(@Res() res, @Param('sessionId') sessionId) {
    const session = await this.sesssionService.getSessionByOnwerId(sessionId);
    if (session && session.video) {
      const url = 'localhost:3000/';
      const video = url + session.video;
      res.send(video);
    }
  }
}
