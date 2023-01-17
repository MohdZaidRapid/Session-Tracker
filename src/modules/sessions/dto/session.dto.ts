import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class SessionDto {
  @Field({ nullable: false, description: 'title of the session' })
  @IsNotEmpty()
  @MinLength(1)
  @IsString()
  readonly title: string;

  @Field({ nullable: true, description: 'description of the session' })
  @IsOptional()
  @IsString()
  readonly description: string;

  @Field({ nullable: false, description: 'header image of the session' })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  readonly headerImage: string;

  @Field({ nullable: false, description: 'Owner  of the session' })
  @IsNotEmpty({ message: 'owner image' })
  @IsString()
  @MinLength(1)
  readonly owner: string;

  @Field({ nullable: true, description: 'Video  of the session' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  readonly video: string;
}

@InputType()
export class GetAllSessionDto {
  @Field({ nullable: true, description: 'Input sort order' })
  @IsNumber()
  sort: number;
}

@InputType()
export class GetSessionByIdDto {
  @Field({ nullable: true, description: 'Input sort order' })
  @IsString()
  id: string;
}
