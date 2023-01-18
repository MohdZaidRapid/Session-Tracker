import * as mongoose from 'mongoose';
import { Blog } from '../interface/blog.interface';

export const BlogSchema = new mongoose.Schema<Blog>(
  {
    title: String,
    bannerImage: String,
    category: String,
    owner: String,
    description: String,
    subContent: [
      {
        title: String,
        content: String,
        images: [String],
      },
    ],
    comments: [
      {
        name: String,
        email: String,
        message: String,
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true },
);
