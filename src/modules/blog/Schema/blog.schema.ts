import * as mongoose from 'mongoose';
import { Blog } from '../interface/blog.interface';

export const SessionSchema = new mongoose.Schema<Blog>(
  {
    title: String,
    bannerImage: String,
    category: String,
    owner: String,
    description: String,
    subContent: [
      {
        title: String,
      },
    ],
    images: [String],
  },
  { timestamps: true },
);
