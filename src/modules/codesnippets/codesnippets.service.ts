import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CodeSnippetsDto } from './dto/CodeSnippets.dto';
import { Snippets } from './interfaces/snippets.interfaces';

@Injectable()
export class CodesnippetsService {
  constructor(
    @InjectModel('codesnippet')
    private readonly codeSnippetModel: Model<Snippets>,
  ) {}

  async createSnippet(codeSnippetsdto: CodeSnippetsDto) {
    try {
      const snippet = await this.codeSnippetModel.create(codeSnippetsdto);
      if (!snippet) {
        throw new Error("something went wrong can't create snippet");
      }
      await snippet.save();
      return {
        message: 'snippet created Successfully',
        success: true,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getSnippets({ sort }) {
    try {
      const snippets = await this.codeSnippetModel
        .find()
        .sort({ createdAt: sort });
      if (!snippets) {
        throw new NotFoundException('No snippet found');
      }
      return snippets;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getSnippetById(getSnippetByIdDto) {
    try {
      const snippet = await this.codeSnippetModel.findById(
        getSnippetByIdDto.id,
      );
      if (!snippet) {
        throw new NotFoundException(" can't found snippet with this id");
      }
      return snippet;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
