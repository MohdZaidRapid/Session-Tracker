import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SessionDto } from './dto/session.dto';
import { SessionsService } from './sessions.service';
import { SessionDef } from './typeDef/resolver-type';

@Resolver(() => SessionDef)
export class SessionsResolver {
  constructor(private sessionService: SessionsService) {}

  @Mutation(() => SessionDef, { name: 'session' })
  async createSession(@Args('input') sessionDto: SessionDto) {
    try {
      const data = await this.sessionService.createSession(sessionDto);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
