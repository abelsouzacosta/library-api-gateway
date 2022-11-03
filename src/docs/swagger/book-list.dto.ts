import { ApiResponseProperty } from '@nestjs/swagger';

export class BookListDto {
  @ApiResponseProperty({
    example: 'Meditations',
  })
  title: string;

  @ApiResponseProperty({
    example: 'Marcus Aurelius meditations',
  })
  description: string;

  @ApiResponseProperty({
    example: 190,
  })
  number_of_pages: number;
}
