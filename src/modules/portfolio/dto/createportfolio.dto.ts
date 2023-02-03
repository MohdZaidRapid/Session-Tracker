import { Optional } from '@nestjs/common';
import { InputType, Field } from '@nestjs/graphql';
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

  // @Field({ nullable: true, description: 'banner of the user' })
  // @IsOptional()
  // banner: string;

  // @Field({ nullable: true, description: 'image of the user' })
  // @IsOptional()
  // @IsString()
  // image: string;

  @Field({ nullable: true, description: 'expertise of the user' })
  @IsOptional()
  @IsBoolean()
  expert: boolean;

  @IsOptional()
  user: string;

  @IsOptional()
  index: string;
}

@InputType()
export class UpdatePorfolioDto {
  @Field({ nullable: true, description: 'id' })
  @IsString()
  @IsOptional()
  id: string;

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

  @Field({ nullable: true, description: 'description of the User' })
  @IsOptional()
  description: string;

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

  @Field({ nullable: true, description: 'expertise of the user' })
  expert: boolean;

  @IsOptional()
  index: string;
}

@InputType()
export class GetAllPortFolioDto {
  @Field({ nullable: true, description: 'sort of the user', defaultValue: 1 })
  @IsOptional()
  @IsString()
  sort: number;

  @Optional()
  name: string;
}

@InputType()
export class GetExpertPortfolioDto {
  @Field({ nullable: true, description: 'id of the portfolio user' })
  @IsOptional()
  @IsString()
  id: string;
}

@InputType()
export class PortfolioImageDto {
  @Field({ nullable: true, description: 'portfolio image of the user' })
  @IsOptional()
  @IsString()
  image: string;

  @Field({ nullable: true, description: 'id of the portfolio' })
  @IsOptional()
  @IsString()
  id: string;
}

@InputType()
export class GetPortfolioByIdDto {
  @Field({ nullable: true, description: 'id of the portfolio' })
  @IsOptional()
  @IsString()
  id: string;
}

@InputType()
export class PortfolioBannerDto {
  @Field({ nullable: true, description: 'portfolio image of the user' })
  @IsOptional()
  @IsString()
  banner: string;

  @Field({ nullable: true, description: 'id of the portfolio' })
  @IsOptional()
  @IsString()
  id: string;
}
