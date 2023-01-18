import { InputType, Int, Field } from '@nestjs/graphql';
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

  @Field(() => [String], { nullable: true, description: 'images array' })
  @IsOptional()
  @IsArray()
  images: string[];
}
@InputType()
export class CreateBlogDto {
  @Field(() => String, { nullable: false, description: 'title of the blog' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field({
    nullable: false,
    description: 'bannerImage of the blog',
  })
  @IsString()
  @IsNotEmpty()
  bannerImage: string;

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

  @Field({
    nullable: false,
    description: 'added name of user',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field({
    nullable: false,
    description: 'added email of Blog user',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @Field({
    nullable: false,
    description: 'added message of Blog user',
  })
  @IsNotEmpty()
  @IsString()
  message: string;
}
