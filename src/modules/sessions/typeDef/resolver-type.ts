import { Field, ObjectType } from '@nestjs/graphql';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

@ObjectType()
export class SessionDef {
  @Field({
    nullable: true,
    description: 'Title of the contents',
  })
  @IsString()
  title: string;
}
