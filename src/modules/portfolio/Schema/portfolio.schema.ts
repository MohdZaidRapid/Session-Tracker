import * as mongoose from 'mongoose';
import { Portfolio } from '../interface/portfolio.interface';

export const PortfolioSchema = new mongoose.Schema<Portfolio>({
  name: { type: String, default: null },
  expertise: { type: String, default: null },
  courses: [{ type: String, default: null }],
  blogs: [{ type: String, default: null, ref: 'blog' }],
  descrtiption: { type: String, default: null },
  email: { type: String, default: null },
  phone: { type: String, default: null },
  website: { type: String, default: null },
  company: { type: String, default: null },
  banner: { type: String, default: null },
  image: { type: String, default: null },
  expert: { type: Boolean, default: false },
  user: { type: String, ref: 'user' },
});
