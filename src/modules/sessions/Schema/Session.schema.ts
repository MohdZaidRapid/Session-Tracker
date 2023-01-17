import * as mongoose from 'mongoose';
import { Session } from '../interfaces/session.interface';

export const SessionSchema = new mongoose.Schema<Session>({
  title: { type: String, nullable: true },
});
