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

  /**
   * @description upload image in server
   * @param file
   * @returns fileName
   */
  //@author mohdzaid
  async uploadAFile(file) {
    try {
      const response = {
        originalname: file.originalname,
        filename: file.filename,
        filepath: file.filepath,
      };
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * @description upload images in server
   * @param files
   * @returns filesName
   */
  //@author mohdzaid
  async uploadFiles(files) {
    try {
      const response = [];
      files.forEach((file) => {
        const fileResponse = {
          originalname: file.originalname,
          filename: file.filename,
          filepath: `localhost:3000/${file.filename}`,
        };
        response.push(fileResponse);
      });
      return response;
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
