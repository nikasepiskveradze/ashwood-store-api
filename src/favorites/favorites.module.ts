import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { UsersModule } from '../users/users.module';
import { Favorite } from './favorite.entity';
import { Product } from '../products/product.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([User, Favorite, Product])],
  providers: [FavoritesService],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
