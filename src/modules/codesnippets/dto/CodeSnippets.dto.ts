import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CodeSnippetsDto {
  @Field({ nullable: false, description: 'Snippet of the code' })
  @IsNotEmpty()
  @IsString()
  codeSnippets: string;

  @Field({ nullable: false, description: 'title of the code' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field({ nullable: false, description: 'description of the code' })
  @IsNotEmpty()
  @IsString()
  description: string;
}

@InputType()
export class GetAllCodeSnippetsDto {
  @Field({
    nullable: false,
    description: 'description of the code',
    defaultValue: 1,
  })
  @IsNotEmpty()
  sort: number;
}

@InputType()
export class GetSnippetByIdDto {
  @Field({
    nullable: false,
    description: 'description of the code',
    defaultValue: 1,
  })
  @IsNotEmpty()
  id: string;
}
