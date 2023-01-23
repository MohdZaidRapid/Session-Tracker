import { Document } from 'mongoose';

export interface User extends Document {
  phone: string;
  password: string;
  email: string;
  token: string;
  username: string;
  refreshToken: string;
  checkPassword: (attempt) => {};
}
