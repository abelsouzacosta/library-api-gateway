import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBookDto {
  @ApiProperty({
    description: 'Book title',
    example: 'The Art of Living',
  })
  @IsString({
    message: 'title should be a string',
  })
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'a short description of the book',
    example: 'stoic reflections to daily life',
  })
  @IsString({
    message: 'description should be a string',
  })
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'number of pages of the book',
    example: 1900,
  })
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 0,
  })
  @IsOptional()
  number_of_pages?: number;
}
