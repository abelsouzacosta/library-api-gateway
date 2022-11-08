import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MessagePatterns } from 'src/constants/enums/message-patterns.enum';
import { BookListDto } from 'src/docs/swagger/book-list.dto';
import { CreateBookDto } from './domain/dto/create-book.dto';
import { UpdateBookDto } from './domain/dto/update-book.dto';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(
    @Inject('BOOK_SERVICE')
    private readonly client: ClientProxy,
  ) {}

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

  @ApiOperation({ summary: 'Gets a specific instance of book' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Instance of book',
    type: BookListDto,
    isArray: false,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send(MessagePatterns.GET_BOOK, id);
  }

  @ApiOperation({ summary: 'Updates a specific instance of book' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'An event was emitted to update book instance',
  })
  @Patch(':id')
  @HttpCode(HttpStatus.CREATED)
  update(@Param('id') id: string, @Body() data: UpdateBookDto) {
    return this.client.emit(MessagePatterns.UPDATE_BOOK, { id, data });
  }
}
