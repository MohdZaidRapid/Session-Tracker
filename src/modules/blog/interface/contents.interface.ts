import { Document } from 'mongoose';

export interface Content extends Document {
  title: string;
}
