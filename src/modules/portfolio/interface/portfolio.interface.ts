import { Document } from 'mongoose';

export interface Portfolio extends Document {
  name: string;
  expertise: string;
  courses: string[];
  blogs: [
    {
      title: string;
      bannerImage: string;
      content: string;
      user: string;
    },
  ];
  description: string;
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
