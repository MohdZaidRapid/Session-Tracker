import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  GetAllSessionDto,
  GetSessionByIdDto,
  SessionDto,
} from './dto/session.dto';
import { SessionsService } from './sessions.service';
import {
  GetSessionByIdDef,
  MessageDef,
  SessionDataDef,
  SessionDef,
} from './typeDef/resolver-type';

@Resolver(() => [])
export class SessionsResolver {
  constructor(private sessionService: SessionsService) {}

  @Mutation(() => MessageDef, { name: 'createSession' })
  async createSession(@Args('input') sessionDto: SessionDto) {
    try {
      return await this.sessionService.createSession(sessionDto);
    } catch (error) {
      throw error;
    }
  }

  @Query(() => SessionDataDef, { name: 'allSessions' })
  async getAllSessions(@Args('input') getAllSessionDto: GetAllSessionDto) {
    try {
      return await this.sessionService.getAllSessions(getAllSessionDto);
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => GetSessionByIdDef, { name: 'getSessionById' })
  async getSessionById(@Args('input') getSessionByIdDto: GetSessionByIdDto) {
    const data = await this.sessionService.getSessionById(getSessionByIdDto);
    return data;
  }
}
