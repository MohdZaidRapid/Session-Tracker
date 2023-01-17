import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class SessionDto {
  @Field({ nullable: true, description: 'Title of the contents' })
  @IsOptional()
  @IsString()
  title: string;
}
