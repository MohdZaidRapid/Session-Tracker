import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Auth, GetUserId } from '../auth/auth.guard';
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

  @Auth()
  @Mutation(() => MessageDef, { name: 'createSession' })
  async createSession(
    @Args('input') sessionDto: SessionDto,
    @GetUserId() user,
  ) {
    try {
      sessionDto.owner = user._id;
      return await this.sessionService.createSession(sessionDto);
    } catch (error) {
      throw error;
    }
  }

  @Auth()
  @Query(() => SessionDataDef, { name: 'getAllSessions' })
  async getAllSessions(@Args('input') getAllSessionDto: GetAllSessionDto) {
    try {
      return await this.sessionService.getAllSessions(getAllSessionDto);
    } catch (error) {
      throw error;
    }
  }

  @Auth()
  @Mutation(() => GetSessionByIdDef, { name: 'getSessionById' })
  async getSessionById(@Args('input') getSessionByIdDto: GetSessionByIdDto) {
    const data = await this.sessionService.getSessionById(getSessionByIdDto);
    return data;
  }
}
