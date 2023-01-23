import { Document } from 'mongoose';

export interface User extends Document {
  _id: string | undefined;
  phone: string;
  password: string | undefined;
  email: string;
  token: string;
  username: string;
  refreshToken: string;
  resetPasswordExpiresIn: string;
  checkPassword: (attempt) => {};
}
