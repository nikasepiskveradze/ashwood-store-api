import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.cart)
  user: User;

  @ManyToOne(() => Product, (product) => product.cartedBy)
  product: Product;

  @CreateDateColumn()
  createdAt: Date;
}
