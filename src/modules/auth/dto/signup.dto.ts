import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class SignupDto {
  @Field({ nullable: true, description: 'phone of the user' })
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(20)
  phone: string;

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
    description: 'name of the user',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @Field({
    nullable: true,
    description: 'token of the user',
  })
  token: string;
}
