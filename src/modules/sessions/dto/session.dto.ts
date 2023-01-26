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

  @Field({ nullable: true, description: 'Video  of the session' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  readonly video: string;
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
  @Field({ nullable: false, description: 'Input sort order' })
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
