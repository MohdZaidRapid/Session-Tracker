import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';
@InputType()
export class ForgotPasswordDto {
  @Field({ nullable: true, description: 'Please provide email' })
  @IsString()
  @IsEmail()
  email: string;
}

@InputType()
export class ResetPasswordDto {
  @Field({ nullable: true, description: 'Please Provide new password' })
  @IsString()
  password: string;
}
