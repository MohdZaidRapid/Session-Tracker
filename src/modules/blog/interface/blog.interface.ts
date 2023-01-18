import { Document } from 'mongoose';

export interface Blog extends Document {
  title: string;
  bannerImage: string;
  category: string;
  owner: string;
  description: string;
  subContent: [
    {
      title: string;
      content: string;
      images: [string];
    },
  ];
  comments: [
    {
      name: string;
      email: string;
      message: string;
      date: Date;
    },
  ];
}
