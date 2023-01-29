import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
@InputType()
export class ForgotPasswordDto {
  @Field({ nullable: false, description: 'Please provide email' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}

@InputType()
export class ResetPasswordDto {
  @Field({ nullable: true, description: 'Please Provide new password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
