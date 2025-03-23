import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { Favorite } from './favorite.entity';
import { Product } from '../products/product.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
  ) {}

  findAll(userId: number) {
    return this.favoriteRepository.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });
  }

  async addOrRemoveFavorites({
    userId,
    productId,
  }: {
    userId: number;
    productId: number;
  }) {
    const favorite = await this.favoriteRepository.findOne({
      where: {
        user: { id: userId },
        product: { id: productId },
      },
      relations: ['product'],
    });

    if (favorite) {
      await this.favoriteRepository.remove(favorite);

      return {
        statusCode: HttpStatus.OK,
        message: 'Product removed successfully.',
      };
    }

    await this.favoriteRepository.save({
      user: { id: userId },
      product: { id: productId },
    });

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Product added successfully.',
    };
  }
}
