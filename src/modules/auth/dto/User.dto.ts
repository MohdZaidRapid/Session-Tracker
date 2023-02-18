import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class UserInfoDto {
  @IsOptional()
  userId: string;

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
}

@InputType()
export class GetAllUserDto {
  @Field({ nullable: true, description: 'limit', defaultValue: 10 })
  @IsOptional()
  @IsNumber()
  readonly limit: number;

  @Field({ nullable: true, description: 'offset', defaultValue: 0 })
  @IsOptional()
  @IsNumber()
  readonly offset: number;

  @Field({
    nullable: true,
    description: 'enter sortOrder ->  (-1 for descending & 1 for ascending)',
    defaultValue: 1,
  })
  @IsOptional()
  @IsNumber()
  readonly sortOrder: number;

  @Field({
    nullable: true,
    description: 'username string',
  })
  @IsOptional()
  @IsString()
  readonly username: string;
}
