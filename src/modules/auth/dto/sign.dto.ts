import { InputType, Field } from '@nestjs/graphql';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class SignInDto {
  @Field({ nullable: false, description: 'email of the user' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @Field({ nullable: false, description: 'password of the user' })
  @IsNotEmpty()
  @IsString()
  password: string;
}

@InputType()
export class CheckDto {
  @Field({ nullable: true })
  name: string;
}
