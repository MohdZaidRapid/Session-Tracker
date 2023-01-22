import { InputType, Field, ObjectType } from '@nestjs/graphql';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class BlogsDto {
  @IsOptional()
  title: string;
  @IsOptional()
  bannerImage: string;
  @IsOptional()
  content: string;
}

@InputType()
export class CreatePortfolioDto {
  @IsOptional()
  name: string;

  @Field({ nullable: true, description: 'name of the expertise' })
  @IsString()
  @IsOptional()
  expertise: string;

  @Field(() => [String], {
    nullable: false,
    description: 'all courses of the author',
  })
  @IsNotEmpty()
  @IsArray()
  courses: string[];

  @IsOptional()
  blogs: BlogsDto[];

  @Field({ nullable: true, description: 'description of the User' })
  @IsOptional()
  description: string;

  @IsOptional()
  email: string;

  @IsOptional()
  phone: string;

  @Field({ nullable: true, description: 'website of the user' })
  @IsOptional()
  website: string;

  @Field({ nullable: true, description: 'location of the user' })
  @IsOptional()
  location: string;

  @Field({ nullable: true, description: 'company of the user' })
  @IsOptional()
  company: string;

  @Field({ nullable: true, description: 'banner of the user' })
  @IsOptional()
  banner: string;

  @Field({ nullable: true, description: 'banner of the user' })
  @IsOptional()
  @IsString()
  image: string;

  @Field({ nullable: false, description: 'expertise of the user' })
  @IsNotEmpty()
  @IsBoolean()
  expert: boolean;

  @IsOptional()
  user: string;
}

@InputType()
export class UpdatePorfolioDto {
  @Field({ nullable: false, description: 'Id of the portfolio' })
  @IsNotEmpty()
  readonly id: string;

  @IsOptional()
  name: string;

  @Field({ nullable: true, description: 'name of the expertise' })
  @IsString()
  @IsOptional()
  expertise: string;

  @Field(() => [String], {
    nullable: false,
    description: 'all courses of the author',
  })
  @IsNotEmpty()
  @IsArray()
  courses: string[];

  @IsOptional()
  blogs: BlogsDto[];

  @Field({ nullable: true, description: 'description of the User' })
  @IsOptional()
  description: string;

  @IsOptional()
  email: string;

  @IsOptional()
  phone: string;

  @Field({ nullable: true, description: 'website of the user' })
  @IsOptional()
  website: string;

  @Field({ nullable: true, description: 'location of the user' })
  @IsOptional()
  location: string;

  @Field({ nullable: true, description: 'company of the user' })
  @IsOptional()
  company: string;

  @Field({ nullable: true, description: 'banner of the user' })
  @IsOptional()
  banner: string;

  @Field({ nullable: true, description: 'banner of the user' })
  @IsOptional()
  @IsString()
  image: string;

  @Field({ nullable: false, description: 'expertise of the user' })
  @IsNotEmpty()
  @IsBoolean()
  expert: boolean;

  @IsOptional()
  user: string;
}
