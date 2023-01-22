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

  /**
   * @description createSession for
   * @param createSessionDto {title: string;
    description: string;
    headerImage: string;
    owner: string;
    video: string}
   * @returns {message success}
   */
  // MohdZaid
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

  /**
   * @description getAllSession return an array of object
   * @param getAllSessionDto {sort 1 or -1}
   * @returns {_id headerImage owner title}
   */
  //author MohdZaid
  @Auth()
  @Query(() => SessionDataDef, { name: 'getAllSessions' })
  async getAllSessions(@Args('input') getAllSessionDto: GetAllSessionDto) {
    try {
      return await this.sessionService.getAllSessions(getAllSessionDto);
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description getSessinById return a  object
   * @param getAllSessionByIdDto {id of the session}
   * @returns {_id headerImage owner title}
   */
  //author MohdZaid
  @Auth()
  @Mutation(() => GetSessionByIdDef, { name: 'getSessionById' })
  async getSessionById(@Args('input') getSessionByIdDto: GetSessionByIdDto) {
    const data = await this.sessionService.getSessionById(getSessionByIdDto);
    return data;
  }
}
