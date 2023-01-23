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
