import { InputType, Field } from '@nestjs/graphql';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class SignupDto {
  @Field({ nullable: false, description: 'name of the user' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field({ nullable: true, description: 'phone of the user' })
  @IsOptional()
  @IsNumber()
  phone: number;

  @Field({ nullable: false, description: 'email of the user' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field({ nullable: false, description: 'password of the user' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @Field({
    nullable: false,
    description: 'username of the user must be unique',
  })
  @IsString()
  @IsNotEmpty()
  readonly username: string;
}
