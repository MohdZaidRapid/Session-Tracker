import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage, Multer } from 'multer';
import { Auth, GetUserId } from '../auth/auth.guard';
import { AuthService } from '../auth/auth.service';
import { SessionsService } from '../sessions/sessions.service';
import { UploadsService } from './uploads.service';
import { editFileName, imageFileFilter } from './utils';

@Controller('uploads')
export class UploadsController {
  constructor(
    private readonly uploadService: UploadsService,
    private readonly authService: AuthService,
    private readonly sesssionService: SessionsService,
  ) {}

  @Post('/UploadAsset')
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
  async uploadAFile(@UploadedFile() file: Multer.File, @Body() body) {
    try {
      const { originalname, filename } = await this.uploadService.uploadAFile(
        file,
      );
      console.log(body);
      await this.sesssionService.uploadImage({
        _id: body.sessionId,
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

// import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { S3 } from 'aws-sdk';
// import * as mongoose from 'mongoose';

// @Controller('upload')
// export class UploadController {
//     private s3: S3;
//     private imageSchema: mongoose.Schema;
//     private Image: mongoose.Model<mongoose.Document>;

//     constructor() {
//         this.s3 = new S3({
//             accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//             secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//         });
//         this.imageSchema = new mongoose.Schema({
//             url: String
//         });
//         this.Image = mongoose.model('Image', this.imageSchema);
//     }

//     @Post()
//     @UseInterceptors(FileInterceptor('file'))
//     async uploadFile(@UploadedFile() file) {
//         const params = {
//             Bucket: 'my-bucket',
//             Key: `path/to/${file.originalname}`,
//             Body: file.buffer,
//         };

//         // Upload the file to S3
//         await this.s3.upload(params).promise();

//         // Get a presigned URL for the uploaded file
//         const url = await this.s3.getSignedUrlPromise('getObject', {
//             Bucket: 'my-bucket',
//             Key: `path/to/${file.originalname}`,
//             Expires: 600,
//         });

//         // Save the URL to the database
//         const image = new this.Image({ url });
//         await image.save();

//         return {
//             message: 'File uploaded successfully',
//             url,
//         };
//     }
// }
