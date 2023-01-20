import { Field, ObjectType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@ObjectType()
export class Owner {
  @Field({ nullable: false, description: 'name of the owner' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @Field({ nullable: false, description: 'email of the owner' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @Field({ nullable: true, description: 'phone of the owner' })
  @IsOptional()
  @IsString()
  phone: string;
}

@ObjectType()
export class SessionDef {
  @Field({
    nullable: true,
    description: '_id of the session',
  })
  @IsString()
  _id: string;
  @Field({
    nullable: true,
    description: 'title of the session',
  })
  @IsString()
  title: string;

  @Field({ nullable: true, description: 'image of the session' })
  @IsString()
  headerImage: string;

  @Field(() => Owner, { nullable: true, description: 'owner of the session' })
  @IsString()
  owner: Owner;
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
  owner: Owner;

  @Field({ nullable: true, description: 'description of the session' })
  @IsString()
  description: string;

  @Field({ nullable: true, description: 'video of the session' })
  @IsString()
  video: string;
}
