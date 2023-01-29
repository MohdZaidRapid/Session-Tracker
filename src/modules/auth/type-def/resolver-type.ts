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
  @Field({ nullable: true, description: 'phone of the user' })
  @IsString()
  readonly phone: number;

  @Field({ nullable: false, description: 'email of the user' })
  @IsString()
  readonly email: string;

  @Field({ nullable: true, description: 'password of the user' })
  @IsOptional()
  readonly password: string;

  @Field({ nullable: true, description: 'username of the user' })
  @IsString()
  @IsNotEmpty()
  readonly username: string;
}

@ObjectType()
export class UserTokenData {
  @Field(() => User, { nullable: true, description: 'token of the user' })
  @IsOptional()
  readonly user: User;
  @Field({ nullable: true, description: 'token of the user' })
  @IsOptional()
  readonly token: string;

  @Field({ nullable: true, description: 'Confirm mail' })
  @IsOptional()
  @IsString()
  readonly message: string;
}
