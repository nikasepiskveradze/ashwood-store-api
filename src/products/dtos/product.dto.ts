import { Expose, Transform } from 'class-transformer';
import { Category } from '../../categories/category.entity';

export class ProductDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  short: string;

  @Expose()
  long: string;

  @Expose()
  quantity: number;

  @Expose()
  price: number;

  @Transform(({ obj }) =>
    obj.categories.map((category: Category) => category.id),
  )
  @Expose()
  categories: Category[];

  @Expose()
  image: string;
}
