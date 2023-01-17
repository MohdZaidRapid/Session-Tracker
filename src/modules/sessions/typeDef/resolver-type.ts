import { Field, ObjectType } from '@nestjs/graphql';
import { IsArray, IsString } from 'class-validator';

@ObjectType()
export class SessionDef {
  @Field({
    nullable: true,
    description: 'title of the session',
  })
  @IsString()
  title: string;

  @Field({ nullable: true, description: 'image of the session' })
  @IsString()
  headerImage: string;

  @Field({ nullable: true, description: 'owner of the session' })
  @IsString()
  owner: string;
}

@ObjectType()
export class SessionDataDef {
  @Field(() => [SessionDef], {
    description: 'Array of data of session of users',
  })
  @IsArray()
  allSessions: SessionDef[];
}

@ObjectType()
export class MessageDef {
  @Field({
    nullable: true,
    description: 'title of the session',
  })
  @IsString()
  message: string;

  @Field({ nullable: true, description: 'success true/false' })
  @IsString()
  success: boolean;
}

@ObjectType()
export class GetSessionByIdDef {
  @Field({
    nullable: true,
    description: 'title of the session',
  })
  @IsString()
  title: string;

  @Field({ nullable: true, description: 'image of the session' })
  @IsString()
  headerImage: string;

  @Field({ nullable: true, description: 'owner of the session' })
  @IsString()
  owner: string;

  @Field({ nullable: true, description: 'description of the session' })
  @IsString()
  description: string;

  @Field({ nullable: true, description: 'video of the session' })
  @IsString()
  video: string;
}
