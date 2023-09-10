import { IsArray, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  short: string;

  @IsString()
  long: string;

  @IsString()
  quantity: string;

  @IsString()
  price: string;

  @IsArray()
  categories: string[];
}
