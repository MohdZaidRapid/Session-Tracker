import { Document } from 'mongoose';

export interface Snippets extends Document {
  codeSnippets: string;
  title: string;
  description: string;
}
