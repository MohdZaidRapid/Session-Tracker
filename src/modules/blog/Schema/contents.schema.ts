import * as mongoose from 'mongoose';
import { Content } from '../interface/contents.interface';

export const ContentSchema = new mongoose.Schema<Content>(
  {
    title: String,
  },
  { timestamps: true },
);
