import { Document } from 'mongoose';

export interface Session extends Document {
  title: string;
}
