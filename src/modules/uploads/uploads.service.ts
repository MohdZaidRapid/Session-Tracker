// import { S3 } from 'aws-sdk';
import * as AWS from 'aws-sdk';
import { Logger, Injectable } from '@nestjs/common';
import { SessionsService } from '../sessions/sessions.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import { GeneratePresignedURLDto } from '../sessions/dto/session.dto';

@Injectable()
export class UploadsService {
  constructor(
    private readonly sessionService: SessionsService,
    private configService: ConfigService,
  ) {}

  // async upload(file) {
  //   const { originalname } = file;
  //   const bucketS3 = 'my-aws-bucket';
  //   await this.uploadS3(file.buffer, bucketS3, originalname);
  // }

  // async uploadS3(file, bucket, name) {
  //   const s3 = this.getS3();
  //   const params = {
  //     Bucket: bucket,
  //     Key: String(name),
  //     Body: file,
  //   };
  //   return new Promise((resolve, reject) => {
  //     s3.upload(params, (err, data) => {
  //       if (err) {
  //         Logger.error(err);
  //         reject(err.message);
  //       }
  //       resolve(data);
  //     });
  //   });
  // }

  // getS3() {
  //   return new S3({
  //     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  //     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  //   });
  // }

  async uploadAFile(file) {
    try {
      const response = {
        originalname: file.originalname,
        filename: file.filename,
      };
      // await this.sessionService.uploadImage({
      //   headerImage: response.filename,
      //   userId: userId,
      // });
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async uploadFiles(files) {
    try {
      try {
        const response = [];
        files.forEach((file) => {
          const fileResponse = {
            originalname: file.originalname,
            filename: file.filename,
          };
          response.push(fileResponse);
        });

        return response;
      } catch (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async generatePresignedURL(generatePresignedURLDto: GeneratePresignedURLDto) {
    try {
      const { fileName, folderPath, contentType } = generatePresignedURLDto;
      AWS.config.update({
        accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
        secretAccessKey: this.configService.get('AWS_S3_KEY_SECRET'),
        region: this.configService.get('AWS_S3_REGION'),
        signatureVersion: 'v4',
      });
      const s3 = new AWS.S3();
      const date = new Date().toISOString().split('T')[0].replace(/-/g, '/');
      const originalFileName = fileName.replace(/[^a-zA-Z0-9]/g, '_');
      const key =
        folderPath +
        '/' +
        date +
        '/' +
        originalFileName +
        '-' +
        uuid() +
        '.' +
        fileName.split('.')[1];

      const url = await s3.getSignedUrlPromise('putObject', {
        Bucket: this.configService.get('AWS_S3_BUCKET'),
        Key: key,
        ContentType: contentType,
        Expires: 360,
      });
      return {
        presignedURL: url,
        key: key,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

// const { presignedURL, key } =
//                     await this.userService.generatePresignedURL({
//                         fileName,
//                         folderPath: 'DIGITALASSET',
//                         contentType: 'video/mp4'
//                     });

//                 uploadPresignedUrl = presignedURL;
//                 uploadKey = key;
// async generatePresignedURL(
//   generatePresignedURLDto: GeneratePresignedURLDto
// ) {
//   try {
//       const { fileName, folderPath, contentType } =
//           generatePresignedURLDto;
//       AWS.config.update({
//           accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
//           secretAccessKey: this.configService.get('AWS_S3_KEY_SECRET'),
//           region: this.configService.get('AWS_S3_REGION'),
//           signatureVersion: 'v4'
//       });
//       const s3 = new AWS.S3();
//       const date = new Date()
//           .toISOString()
//           .split('T')[0]
//           .replace(/-/g, '/');
//       const originalFileName = fileName.replace(/[^a-zA-Z0-9]/g, '_');
//       const key =
//           folderPath +
//           '/' +
//           date +
//           '/' +
//           originalFileName +
//           '-' +
//           uuid() +
//           '.' +
//           fileName.split('.')[1];
//       const url = await s3.getSignedUrlPromise('putObject', {
//           Bucket: this.configService.get('AWS_S3_BUCKET'),
//           Key: key,
//           ContentType: contentType,
//           Expires: 360
//       });
//       return {
//           presignedURL: url,
//           key: key
//       };
//   } catch (error) {
//       this.logger.error(
//           'error',
//           `USER-MS - generatePresignedURL - for ${JSON.stringify(
//               generatePresignedURLDto
//           )} - error - ${JSON.stringify(error)}`
//       );
//       await this.responseHandlerService.response(
//           error,
//           HttpStatus.INTERNAL_SERVER_ERROR,
//           GrpcStatus.INTERNAL,
//           null
//       );
//   }
// }
