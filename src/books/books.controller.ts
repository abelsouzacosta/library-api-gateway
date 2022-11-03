import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { RABBITMQ_URL } from 'src/config';
import { MessagePatterns } from 'src/constants/enums/message-patterns.enum';
import { Queues } from 'src/constants/enums/queues.enum';
import { CreateBookDto } from './domain/dto/create-book.dto';

@Controller('books')
export class BooksController {
  private readonly client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [RABBITMQ_URL],
        queue: Queues.LIBRARY,
      },
    });
  }

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() data: CreateBookDto) {
    return this.client.emit(MessagePatterns.CREATE_BOOK, data);
  }

  @Get()
  list() {
    return this.client.send(MessagePatterns.LIST_BOOKS, {});
  }
}
