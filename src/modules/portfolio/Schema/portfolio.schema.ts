import * as mongoose from 'mongoose';
import { Portfolio } from '../interface/portfolio.interface';

export const PortfolioSchema = new mongoose.Schema<Portfolio>({
  name: { type: String, default: null },
  expertise: { type: String, default: null },
  courses: {
    type: [String],
  },
  // blogs: [String],
  blogs: [
    {
      title: { type: String, default: null },
      bannerImage: { type: String, default: null },
      content: { type: String, default: null },
      user: { type: String, ref: 'user', default: null },
    },
  ],
  // blogs: { type: String, ref: 'blog' },
  description: { type: String, default: null },
  email: { type: String, default: null },
  phone: { type: String, default: null },
  website: { type: String, default: null },
  company: { type: String, default: null },
  banner: { type: String, default: null },
  image: { type: String, default: null },
  expert: { type: Boolean, default: false },
  user: { type: String, ref: 'user' },
});
