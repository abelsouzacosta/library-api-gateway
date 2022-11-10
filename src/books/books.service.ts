import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { EventPatterns } from 'src/constants/enums/event-patterns.enum';
import { MessagePatterns } from 'src/constants/enums/message-patterns.enum';
import { CreateBookDto } from './domain/dto/create-book.dto';
import { UpdateBookDto } from './domain/dto/update-book.dto';
import { BookNotFoundException } from './domain/exceptions/book-not-found.exception';

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
    const book = await firstValueFrom(
      this.client.send(MessagePatterns.GET_BOOK, id),
    );

    if (!book) throw new BookNotFoundException(id);

    return book;
  }

  async update(id: string, data: UpdateBookDto) {
    await this.findById(id);

    return this.client.emit(EventPatterns.UPDATE_BOOK, { id, data });
  }

  async delete(id: string) {
    await this.findById(id);

    return this.client.emit(EventPatterns.DELETE_BOOK, id);
  }
}
