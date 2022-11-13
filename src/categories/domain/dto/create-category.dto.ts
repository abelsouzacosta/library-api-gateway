import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString({
    message: 'name should be a string',
  })
  @IsNotEmpty({
    message: 'name should not be empty',
  })
  name: string;
}
