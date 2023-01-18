import { CreateBlogDto } from './blog.dto';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBlogInput extends PartialType(CreateBlogDto) {
  @Field(() => String)
  _id: string;
}
