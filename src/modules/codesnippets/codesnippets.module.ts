import { Module } from '@nestjs/common';
import { CodesnippetsController } from './codesnippets.controller';
import { CodesnippetsService } from './codesnippets.service';
import { CodesnippetsResolver } from './codesnippets.resolver';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SnippetSchema } from './schema/snippets.schmea';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'codesnippet', schema: SnippetSchema }]),
    AuthModule,
  ],
  controllers: [CodesnippetsController],
  providers: [CodesnippetsService, CodesnippetsResolver],
})
export class CodesnippetsModule {}
