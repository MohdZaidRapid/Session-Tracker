import { Optional } from '@nestjs/common';
import { InputType, Field } from '@nestjs/graphql';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateContentDto {
  @Field({ nullable: false, description: 'title Of the content ' })
  @IsNotEmpty()
  @IsString()
  title: string;
}

@InputType()
export class SubContent {
  @Field({ nullable: false, description: 'title of blog' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field(() => String, { nullable: false, description: 'Content of the blog' })
  @MinLength(10)
  content: string;
}
@InputType()
export class CreateBlogDto {
  @Field(() => String, { nullable: false, description: 'title of the blog' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @Optional()
  owner: string;

  @Field({ nullable: true, description: 'category of the blog' })
  @IsString()
  @IsOptional()
  category: string;

  @Field({
    nullable: true,
    description: 'description of the blog',
  })
  @IsString()
  @IsOptional()
  description: string;

  @Field(() => [SubContent], {
    nullable: false,
    description: 'subContent of the blog',
  })
  subContent: SubContent[];
}

@InputType()
export class GetBlogByIdDto {
  @Field({
    nullable: false,
    description: 'id of the blog',
  })
  @IsString()
  @IsNotEmpty()
  id: string;
}

@InputType()
export class CommentsDto {
  @Field({
    nullable: false,
    description: 'id of Blog ',
  })
  @IsNotEmpty()
  @IsString()
  id: string;

  @Optional()
  name: string;

  @Optional()
  email: string;

  @Field({
    nullable: false,
    description: 'added message of Blog user',
  })
  @IsNotEmpty()
  @IsString()
  message: string;
}

@InputType()
export class BlogDto {
  @Field({
    nullable: true,
    description: 'id of Blog ',
  })
  @IsOptional()
  @IsString()
  _id: string;

  @Field({
    nullable: true,
    description: 'id of Blog ',
  })
  @IsOptional()
  @IsString()
  owner: string;
}

@InputType()
export class GetAllPortfolioDto {
  @Field({
    nullable: true,
    description: 'id of Blog ',
  })
  @IsOptional()
  @IsString()
  name: string;
}

@InputType()
export class BannerImageDto {
  @Field({
    nullable: false,
    description: 'id of the blog',
  })
  @IsString()
  @IsNotEmpty()
  id: string;
  @Field({
    nullable: false,
    description: 'bannerImage of the blog',
  })
  @IsString()
  @IsNotEmpty()
  bannerImage: string;
}
