import { Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Session } from '../interfaces/session.interface';

export const SessionSchema = new mongoose.Schema<Session>(
  {
    title: { type: String, default: null },
    description: { type: String, default: null },
    headerImage: { type: String, default: null },
    owner: {
      type: String,
      nullable: true,
      ref: 'user',
    }, 
    video: { type: String, default: null },
  },
  { timestamps: true },
);
