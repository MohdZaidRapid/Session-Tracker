import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNegative, IsNotEmpty, IsString } from 'class-validator';
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
  password: string;
}
