import { Field, ObjectType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Owner } from 'src/modules/sessions/typeDef/resolver-type';

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

  @Field({ nullable: true, description: 'Owner details of blog ' })
  @IsOptional()
  readonly owner: Owner;
}

@ObjectType()
export class CommentData {
  @Field({
    nullable: true,
    description: 'name of the ',
  })
  @IsOptional()
  @IsString()
  readonly name: string;

  @Field({
    nullable: true,
    description: 'email of the user',
  })
  @IsOptional()
  @IsString()
  readonly email: string;

  @Field({
    nullable: true,
    description: 'message of the comment',
  })
  @IsOptional()
  @IsString()
  readonly message: string;

  @Field({
    nullable: true,
    description: 'date of the comment',
  })
  @IsOptional()
  @IsString()
  readonly date: Date;
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

  @Field({
    nullable: true,
    description: 'id of the session',
  })
  @IsOptional()
  @IsString()
  readonly content: string;

  @Field(() => [String], {
    nullable: true,
    description: 'subContent of the blog',
  })
  @IsString()
  @IsOptional()
  readonly images: string[];
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

  @Field(() => [CommentData], {
    nullable: true,
    description: 'subContent of the blog',
  })
  @IsString()
  @IsOptional()
  readonly comments: CommentData[];

  @Field({
    nullable: true,
    description: 'owner of the blog',
  })
  @IsOptional()
  @IsString()
  owner: Owner;
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
