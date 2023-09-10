import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../categories/category.entity';

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

  @ManyToMany(() => Category, { cascade: true })
  @JoinTable()
  categories: Category[];
}
