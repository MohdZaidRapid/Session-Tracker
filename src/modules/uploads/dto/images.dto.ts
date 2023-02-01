import { Optional } from '@nestjs/common';
import { InputType, Field } from '@nestjs/graphql';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class ImagesArr {
  @Field(() => [String], { nullable: true, description: 'images array' })
  @IsOptional()
  @IsArray()
  images: string[];
}
