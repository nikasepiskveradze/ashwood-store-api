import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../roles/role.entity';
import { Favorite } from '../favorites/favorite.entity';
import { Cart } from '../cart/cart.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  lastname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'date' })
  birthday: string;

  @Column({ default: 10000 })
  balance: number;

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[];

  @OneToMany(() => Cart, (cart) => cart.user)
  cart: Cart[];
}
