import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../categories/category.entity';
import { Favorite } from '../favorites/favorite.entity';
import { Cart } from '../cart/cart.entity';
import { Order } from '../orders/order.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  short: string;

  @Column()
  long: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  image: string;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @OneToMany(() => Favorite, (favorite) => favorite.product)
  favoritedBy: Favorite[];

  @OneToMany(() => Cart, (cart) => cart.product)
  cartedBy: Cart[];

  @OneToMany(() => Order, (order) => order.product)
  orders: Order[];
}
