import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString({
    message: 'title should be a string',
  })
  @IsNotEmpty({
    message: 'title is required',
  })
  title: string;

  @IsString({
    message: 'description should be a string',
  })
  @IsNotEmpty({
    message: 'description is required',
  })
  description: string;

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
