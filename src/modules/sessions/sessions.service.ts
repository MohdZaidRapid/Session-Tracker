import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session } from './interfaces/session.interface';

@Injectable()
export class SessionsService {
  constructor(@InjectModel('session') private sessionModel: Model<Session>) {}

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
      throw new Error(error.message);
    }
  }

  /**
   * @description getAllSession return an array of object
   * @param getAllSessionDto {sort 1 or -1}
   * @returns {_id  owner title}
   */
  //author MohdZaid
  async getAllSessions({ sort }) {
    try {
      let allSessions = await this.sessionModel
        .find()
        .populate('owner')
        .sort({ createdAt: sort });
      if (!allSessions || allSessions.length <= 0) {
        throw new NotFoundException('No sessions are found');
      }
      return { allSessions };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * @description getSessinById return a  object
   * @param getAllSessionByIdDto {id of the session}
   * @returns {_id headerImage owner title}
   */
  //author MohdZaid
  async getSessionById({ id }) {
    try {
      const session = await this.sessionModel.findById(id).populate('owner');
      if (!session) {
        throw new NotFoundException('No session found with this id');
      }
      return session;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async uploadImage({ _id, headerImage }) {
    try {
      await this.sessionModel.findByIdAndUpdate(_id, {
        $set: { headerImage: headerImage },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  
}
