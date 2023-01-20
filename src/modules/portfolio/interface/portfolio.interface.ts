import { Document } from 'mongoose';

export interface Portfolio extends Document {
  name: string;
  expertise: string;
  courses: [];
  blogs: [{}];
  descrtiption: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  company: string;
  banner: string;
  image: string;
  expert: boolean;
  user: string;
}
