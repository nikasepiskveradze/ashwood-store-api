import { IsNumber } from 'class-validator';

export class AddProductToFavorites {
  @IsNumber()
  productId: number;
}
