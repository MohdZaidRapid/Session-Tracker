import * as mongoose from 'mongoose';
import { Snippets } from '../interfaces/snippets.interfaces';

export const SnippetSchema = new mongoose.Schema<Snippets>(
  {
    title: { type: String, required: true, default: null },
    codeSnippets: { type: String, required: true, default: null },
    description: { type: String, required: true, default: null },
  },
  { timestamps: true },
);
