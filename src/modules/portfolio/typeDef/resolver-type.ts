import { Field, ObjectType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsString, IsOptional } from 'class-validator';

@ObjectType()
export class PortfolioDef {
  @Field({ nullable: true, description: 'name of the user' })
  @IsString()
  name: string;

  @Field({ nullable: true, description: 'Image of the user' })
  @IsString()
  image: string;

  @Field(() => [String], { nullable: true, description: 'courses' })
  @IsArray()
  courses: string[];

  @Field({ nullable: true, description: 'description of the user' })
  @IsOptional()
  @IsString()
  descripiton: string;

  @IsOptional()
  expert: boolean;
}

@ObjectType()
export class BlogsDto {
  @IsOptional()
  title: string;
  @IsOptional()
  bannerImage: string;
  @IsOptional()
  content: string;
}

@ObjectType()
export class GetExpertPoertfolioDef {
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

  @Field({ nullable: true, description: 'expertise of the user' })
  @IsOptional()
  expert: boolean;

  @IsOptional()
  user: string;
}
