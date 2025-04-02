import { IsNumber } from 'class-validator';

export class ToggleProductInCartDto {
  @IsNumber()
  productId: number;
}
