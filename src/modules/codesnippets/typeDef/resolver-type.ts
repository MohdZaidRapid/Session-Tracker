import { Field, ObjectType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsString, IsOptional } from 'class-validator';

@ObjectType()
export class SnippetDef {
  @Field({ description: 'id of the snippet', nullable: false })
  @IsNotEmpty()
  @IsString()
  readonly _id: string;

  @Field({ description: 'title of the snippet', nullable: false })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @Field({ description: 'description of the snippet', nullable: false })
  @IsNotEmpty()
  @IsString()
  readonly description: string;
}

@ObjectType()
export class GetSnippetByIdDef {
  @Field({ description: 'id of the snippet', nullable: false })
  @IsNotEmpty()
  @IsString()
  readonly _id: string;

  @Field({ description: 'title of the snippet', nullable: false })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @Field({ description: 'description of the snippet', nullable: false })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @Field({ description: 'description of the snippet', nullable: false })
  @IsNotEmpty()
  @IsString()
  readonly codeSnippets: string;
}
