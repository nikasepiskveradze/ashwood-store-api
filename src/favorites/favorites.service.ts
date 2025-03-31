import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { Favorite } from './favorite.entity';
import { Product } from '../products/product.entity';
import { PaginationDto } from '../../dtos/pagination.dto';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Favorite)
    private favoriteRepository: Repository<Favorite>,
  ) {}

  async findAll(userId: number, query: PaginationDto) {
    const { limit = 10, page = 1 } = query;

    const [data, total] = await this.favoriteRepository.findAndCount({
      where: { user: { id: userId } },
      relations: ['product'],
      order: { id: 'asc' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      total,
    };
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
