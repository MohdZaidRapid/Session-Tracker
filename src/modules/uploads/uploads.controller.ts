import {
  Body,
  Controller,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage, Multer } from 'multer';
import { Auth, GetUserId } from '../auth/auth.guard';
import { AuthService } from '../auth/auth.service';
import { BlogService } from '../blog/blog.service';
import { SessionsService } from '../sessions/sessions.service';
import { UploadsService } from './uploads.service';
import { editFileName, imageFileFilter } from './utils';

@Controller('uploads')
export class UploadsController {
  constructor(
    private readonly uploadService: UploadsService,
    private readonly authService: AuthService,
    private readonly sesssionService: SessionsService,
    private readonly blogService: BlogService,
  ) {}

  /**
   * @description upload images onmongodb database
   * @param files sessionId
   * @returns message success
   */
  //@author mohdzaid
  @Post('/UploadAsset/:sessionId')
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
  ) {
    try {
      const { originalname, filename } = await this.uploadService.uploadAFile(
        file,
      );
      await this.sesssionService.uploadImage({
        _id: sessionId,
        headerImage: filename,
      });
      return {
        message: 'session image uploaded successfully',
        success: true,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * @description upload images onmongodb database
   * @param files sessionId
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
  ) {
    try {
      
      const { originalname, filename } = await this.uploadService.uploadAFile(
        file,
      );
      await this.blogService.uploadBannerImage({
        id: blogId,
        bannerImage: filename,
      });
      return {
        message: 'session image uploaded successfully',
        success: true,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * @description upload images on mongodb database
   * @param files sessionId
   * @returns message success
   */
  //@author mohdzaid
  @Post('/multiple')
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
  async uploadFiles(@UploadedFiles() files) {
    return await this.uploadService.uploadFiles(files);
  }
}
