import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EventPatterns } from 'src/constants/enums/event-patterns.enum';
import { MessagePatterns } from 'src/constants/enums/message-patterns.enum';
import { CreateBookDto } from './domain/dto/create-book.dto';
import { UpdateBookDto } from './domain/dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @Inject('BOOK_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  async create(data: CreateBookDto) {
    return this.client.emit(EventPatterns.CREATE_BOOK, data);
  }

  async list() {
    return this.client.send(MessagePatterns.LIST_BOOKS, {});
  }

  async findById(id: string) {
    return this.client.send(MessagePatterns.GET_BOOK, id);
  }

  async update(id: string, data: UpdateBookDto) {
    return this.client.emit(EventPatterns.UPDATE_BOOK, { id, data });
  }

  async delete(id: string) {
    return this.client.emit(EventPatterns.DELETE_BOOK, id);
  }
}
