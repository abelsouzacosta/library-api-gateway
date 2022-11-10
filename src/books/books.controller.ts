import {
  Body,
  Controller,
  Delete,
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
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BookListDto } from 'src/docs/swagger/book-list.dto';
import { BooksService } from './books.service';
import { CreateBookDto } from './domain/dto/create-book.dto';
import { UpdateBookDto } from './domain/dto/update-book.dto';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly service: BooksService) {}

  @ApiOperation({ summary: 'Creates a new Book entity' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'Book was sucessfully created',
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  create(@Body() data: CreateBookDto) {
    return this.service.create(data);
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
    return this.service.list();
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
    return this.service.findById(id);
  }

  @ApiOperation({ summary: 'Updates a specific instance of book' })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'An event was emitted to update book instance',
  })
  @Patch(':id')
  @HttpCode(HttpStatus.CREATED)
  update(@Param('id') id: string, @Body() data: UpdateBookDto) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
