import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session } from './interfaces/session.interface';

@Injectable()
export class SessionsService {
  constructor(@InjectModel('Session') private sessionModel: Model<Session>) {}

  async createSession(createSessionDto) {
    try {
      let session = await this.sessionModel.create(createSessionDto);
      session.save();
      return session;
    } catch (error) {
      console.log(error);
    }
  }
}
