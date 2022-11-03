import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RABBITMQ_URL } from 'src/config';
import { MessagePatterns } from 'src/constants/enums/message-patterns.enum';
import { Queues } from 'src/constants/enums/queues.enum';
import { BookListDto } from 'src/docs/swagger/book-list.dto';
import { CreateBookDto } from './domain/dto/create-book.dto';

@ApiTags('books')
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

  @ApiOperation({ summary: 'Creates a new Book entity' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Book was sucessfully created',
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  create(@Body() data: CreateBookDto) {
    return this.client.emit(MessagePatterns.CREATE_BOOK, data);
  }

  @ApiOperation({ summary: 'Gets a list of all books in the database' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of books',
    type: BookListDto,
    isArray: true,
  })
  @Get()
  list() {
    return this.client.send(MessagePatterns.LIST_BOOKS, {});
  }
}
