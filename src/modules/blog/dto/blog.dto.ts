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
  @Field({ description: 'SubContent of blog' })
  @IsOptional()
  @IsString()
  title: string;
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
    nullable: true,
    description: 'subContent of the blog',
  })
  @IsArray()
  @IsOptional()
  subContent: SubContent[];

  @Field(() => String, { nullable: false, description: 'Content of the blog' })
  @MinLength(10)
  content: string;

  @Field(() => [String], { nullable: true, description: 'images array' })
  @IsOptional()
  @IsArray()
  images: string[];
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
