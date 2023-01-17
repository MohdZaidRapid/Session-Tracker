import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session } from './interfaces/session.interface';

@Injectable()
export class SessionsService {
  constructor(@InjectModel('Session') private sessionModel: Model<Session>) {}

  async createSession(createSessionDto) {
    try {
      let session = await this.sessionModel.create(createSessionDto);
      await session.save();
      if (!session) {
        throw new Error("Can't create session something went wrong");
      }
      return {
        message: 'Your session created Successfully',
        success: true,
      };
    } catch (error) {
      return {
        message: error.message,
        success: false,
      };
    }
  }

  async getAllSessions(getAllSessionDto) {
    let allSessions = await this.sessionModel.find();
    if (!allSessions || allSessions.length <= 0) {
      throw new NotFoundException('No session are found');
    }
    return { allSessions };
  }

  async getSessionById({ id }) {
    const session = await this.sessionModel.findById(id);
    if (!session) {
      throw new NotFoundException('No session found with this id');
    }
    return session;
  }
}
