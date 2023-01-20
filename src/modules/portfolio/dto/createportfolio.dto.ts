import { Optional } from '@nestjs/common';
import { InputType, Field } from '@nestjs/graphql';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class Courses {
  @Field({ nullable: true, description: 'name of the course' })
  @IsOptional()
  @IsString()
  name: string;
}

@InputType()
export class CreatePortfolioDto {
  @Optional()
  name: string;

  @Field({ nullable: true, description: 'name of the expertise' })
  @IsString()
  @IsOptional()
  expertise: string;

  @Field(() => [Courses], {
    nullable: true,
    description: 'all courses of the author',
  })
  @IsNotEmpty()
  @IsArray()
  courses: Courses[];

  @Field(() => [String], { nullable: true, description: 'Blogs of the owner' })
  @IsOptional()
  @IsString()
  blogs: string[];

  @Field({ nullable: true, description: 'description of the User' })
  @Optional()
  @IsString()
  description: string;

  @Optional()
  email: string;

  @Optional()
  phone: string;

  @Field({ nullable: true, description: 'website of the user' })
  @Optional()
  @IsString()
  website: string;

  @Field({ nullable: true, description: 'location of the user' })
  @Optional()
  @IsString()
  location: string;

  @Field({ nullable: true, description: 'company of the user' })
  @Optional()
  @IsString()
  company: string;

  @Field({ nullable: true, description: 'banner of the user' })
  @Optional()
  @IsString()
  banner: string;

  @Field({ nullable: true, description: 'banner of the user' })
  @Optional()
  @IsString()
  image: string;

  @Field({ nullable: true, description: 'expertise of the user' })
  @IsNotEmpty()
  @IsBoolean()
  expert: boolean;
}
