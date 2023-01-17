import { Document } from 'mongoose';

export interface Session extends Document {
  title: string;
  description: string;
  headerImage: string;
  owner: string;
  video: string;
}
