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
  readonly _id: string;

  @Field({ nullable: true, description: 'title of the blog' })
  @IsString()
  @IsOptional()
  readonly title: string;

  @Field({ nullable: true, description: 'bannerImage of the blog' })
  @IsString()
  @IsOptional()
  readonly bannerImage: string;

  @Field({ nullable: true, description: 'category of the blog' })
  @IsString()
  @IsOptional()
  readonly category: string;

  @Field({ nullable: true, description: 'description of the blog' })
  @IsString()
  @IsOptional()
  readonly description: string;

  @Field({ nullable: true, description: 'date on which blog is updated' })
  @IsOptional()
  readonly createdAt: Date;
}

@ObjectType()
export class SubContentData {
  @Field({
    nullable: true,
    description: 'id of the session',
  })
  @IsOptional()
  @IsString()
  readonly title: string;
}

@ObjectType()
export class BlogByIdDef {
  @Field({
    nullable: true,
    description: 'id of the session',
  })
  @IsString()
  @IsNotEmpty()
  readonly _id: string;

  @Field({ nullable: true, description: 'title of the blog' })
  @IsString()
  @IsOptional()
  readonly title: string;

  @Field({ nullable: true, description: 'bannerImage of the blog' })
  @IsString()
  @IsOptional()
  readonly bannerImage: string;

  @Field({ nullable: true, description: 'category of the blog' })
  @IsString()
  @IsOptional()
  readonly category: string;

  @Field({ nullable: true, description: 'description of the blog' })
  @IsString()
  @IsOptional()
  readonly description: string;

  @Field({ nullable: true, description: 'date on which blog is updated' })
  @IsOptional()
  readonly createdAt: Date;

  @Field(() => [SubContentData], {
    nullable: true,
    description: 'subContent of the blog',
  })
  @IsArray()
  @IsOptional()
  readonly subContent: SubContentData[];

  @Field(() => [String], {
    nullable: true,
    description: 'subContent of the blog',
  })
  @IsString()
  @IsOptional()
  readonly images: string[];
}

@ObjectType()
export class ContentDef {
  @Field({ description: '_id Of the content ' })
  @IsOptional()
  readonly _id: string;

  @Field({ description: 'title Of the content ' })
  @IsOptional()
  readonly title: string;
}
