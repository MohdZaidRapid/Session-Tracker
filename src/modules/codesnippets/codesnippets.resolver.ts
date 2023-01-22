import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Auth, GetUserId } from '../auth/auth.guard';
import { MessageDef } from '../sessions/typeDef/resolver-type';
import { CodesnippetsService } from './codesnippets.service';
import {
  CodeSnippetsDto,
  GetAllCodeSnippetsDto,
  GetSnippetByIdDto,
} from './dto/CodeSnippets.dto';
import { SnippetDef } from './typeDef/resolver-type';

@Resolver()
export class CodesnippetsResolver {
  constructor(private codesnippetsService: CodesnippetsService) {}

  @Auth()
  @Mutation(() => MessageDef, { name: 'createSnippets' })
  async createSnippet(
    @Args('input') codeSnippetsDto: CodeSnippetsDto,
    @GetUserId() user,
  ) {
    return await this.codesnippetsService.createSnippet(codeSnippetsDto);
  }

  @Auth()
  @Mutation(() => [SnippetDef], { name: 'getSnippets' })
  async getSnippets(
    @Args('input') getAllCodeSnippetsDto: GetAllCodeSnippetsDto,
    @GetUserId() user,
  ) {
    return await this.codesnippetsService.getSnippets(getAllCodeSnippetsDto);
  }
  //   GetSnippetByIdDto

  @Auth()
  @Mutation(() => SnippetDef, { name: 'getSnippetById' })
  async getSnippetById(
    @Args('input') getSnippetByIdDto: GetSnippetByIdDto,
    @GetUserId() user,
  ) {
    return await this.codesnippetsService.getSnippetById(getSnippetByIdDto);
  }
}
