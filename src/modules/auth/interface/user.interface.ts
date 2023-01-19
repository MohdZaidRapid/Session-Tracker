import { Document } from 'mongoose';

export interface User extends Document {
  name: string;
  phone: number;
  password: string;
  email: string;
  token: string;
}
