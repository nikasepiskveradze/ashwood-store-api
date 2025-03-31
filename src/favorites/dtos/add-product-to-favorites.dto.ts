import { IsNumber } from 'class-validator';

export class AddProductToFavoritesDto {
  @IsNumber()
  productId: number;
}
