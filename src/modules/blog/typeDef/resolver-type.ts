import { Field, ObjectType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsString, IsOptional } from 'class-validator';

@ObjectType()
export class Blog {
  @Field({
    nullable: true,
    description: 'id of the session',
  })
  @IsString()
  @IsNotEmpty()
  _id: string;

  @Field({ nullable: true, description: 'title of the blog' })
  @IsString()
  @IsOptional()
  title: string;

  @Field({ nullable: true, description: 'bannerImage of the blog' })
  @IsString()
  @IsOptional()
  bannerImage: string;

  @Field({ nullable: true, description: 'category of the blog' })
  @IsString()
  @IsOptional()
  category: string;

  @Field({ nullable: true, description: 'description of the blog' })
  @IsString()
  @IsOptional()
  description: string;

  @Field({ nullable: true, description: 'date on which blog is updated' })
  @IsOptional()
  createdAt: Date;
}

@ObjectType()
export class SubContentData {
  @Field({
    nullable: true,
    description: 'id of the session',
  })
  @IsOptional()
  @IsString()
  title: string;
}

@ObjectType()
export class BlogByIdDef {
  @Field({
    nullable: true,
    description: 'id of the session',
  })
  @IsString()
  @IsNotEmpty()
  _id: string;

  @Field({ nullable: true, description: 'title of the blog' })
  @IsString()
  @IsOptional()
  title: string;

  @Field({ nullable: true, description: 'bannerImage of the blog' })
  @IsString()
  @IsOptional()
  bannerImage: string;

  @Field({ nullable: true, description: 'category of the blog' })
  @IsString()
  @IsOptional()
  category: string;

  @Field({ nullable: true, description: 'description of the blog' })
  @IsString()
  @IsOptional()
  description: string;

  @Field({ nullable: true, description: 'date on which blog is updated' })
  @IsOptional()
  createdAt: Date;

  @Field(() => [SubContentData], {
    nullable: true,
    description: 'subContent of the blog',
  })
  @IsArray()
  @IsOptional()
  subContent: SubContentData[];

  @Field(() => [String], {
    nullable: true,
    description: 'subContent of the blog',
  })
  @IsString()
  @IsOptional()
  images: string[];
}
