import { Field, ObjectType } from '@nestjs/graphql';
import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEmail,
} from 'class-validator';

@ObjectType()
export class User {
  @Field({ nullable: true, description: 'name of the user' })
  @IsString()
  @IsOptional()
  readonly name: string;

  @Field({ nullable: true, description: 'phone of the user' })
  @IsString()
  readonly phone: number;

  @Field({ nullable: false, description: 'email of the user' })
  @IsString()
  readonly email: string;

  @Field({ nullable: true, description: 'password of the user' })
  @IsOptional()
  readonly password: string;
}
