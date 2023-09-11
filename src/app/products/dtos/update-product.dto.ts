import { IsArray, IsString } from 'class-validator';

export class UpdateProductDto {
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
