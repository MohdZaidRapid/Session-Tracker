import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogResolver } from './blog.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from './Schema/blog.schema';
import { ContentSchema } from './Schema/contents.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'blog', schema: BlogSchema },
      { name: 'content', schema: ContentSchema },
    ]),
  ],
  providers: [BlogResolver, BlogService],
  exports: [BlogService, BlogResolver],
})
export class BlogModule {}
