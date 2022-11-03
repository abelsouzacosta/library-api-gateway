import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({
    description: 'Book title',
    example: 'The Art of Living',
  })
  @IsString({
    message: 'title should be a string',
  })
  @IsNotEmpty({
    message: 'title is required',
  })
  title: string;

  @ApiProperty({
    description: 'a short description of the book',
    example: 'stoic reflections to daily life',
  })
  @IsString({
    message: 'description should be a string',
  })
  @IsNotEmpty({
    message: 'description is required',
  })
  description: string;

  @ApiProperty({
    description: 'number of pages of the book',
    example: 1900,
  })
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
  })
  @IsNotEmpty({
    message: 'number_of_pages is required',
  })
  number_of_pages: number;
}
