import { Optional } from '@nestjs/common';
import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class SessionDto {
  @Field({ nullable: false, description: 'title of the session' })
  @IsNotEmpty()
  @MinLength(1)
  @IsString()
  readonly title: string;

  @Field({ nullable: true, description: 'description of the session' })
  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  owner: string;
}

@InputType()
export class GetAllSessionDto {
  @Field({ nullable: true, description: 'Input sort order', defaultValue: 1 })
  @IsNumber()
  sort: number;
}

@InputType()
export class UploadImageDto {
  @Field({ nullable: false, description: 'header image of the session' })
  @IsNotEmpty()
  @MinLength(1)
  readonly headerImage: string;

  userId: string;
}

@InputType()
export class GetSessionByIdDto {
  @Field({ nullable: false, description: 'Id of the session' })
  @IsNotEmpty()
  @IsString()
  id: string;
}

@InputType()
export class GeneratePresignedURLDto {
  @IsString()
  @IsNotEmpty()
  readonly fileName: string;

  @IsString()
  @IsNotEmpty()
  readonly folderPath: string;

  @IsString()
  @IsNotEmpty()
  contentType: string;
}

@InputType()
export class UploadSessionImageDto {
  @Field({ nullable: true, description: 'header Image  of the session' })
  @IsOptional()
  @IsString()
  readonly headerImage: string;

  @Field({ nullable: true, description: 'id  of the session' })
  @IsOptional()
  @IsString()
  readonly id: string;
}

@InputType()
export class VideoDto {
  @Field({ nullable: true, description: 'Video  of the session' })
  @IsOptional()
  @IsString()
  readonly video: string;

  @Field({ nullable: true, description: 'id  of the session' })
  @IsOptional()
  @IsString()
  readonly id: string;
}
