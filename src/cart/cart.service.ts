import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
  ) {}

  async findAll(userId: number) {
    const allCarts = await this.cartRepository.find({
      where: { user: { id: userId } },
      relations: ['product', 'user'],
      select: {
        user: { id: true },
      },
    });

    return allCarts;
  }

  async createOrUpdateCart({
    userId,
    productId,
  }: {
    userId: number;
    productId: number;
  }) {
    const cartItem = await this.cartRepository.findOne({
      where: {
        user: { id: userId },
        product: { id: productId },
      },
    });

    if (cartItem) {
      await this.cartRepository.remove(cartItem);

      return {
        statusCode: HttpStatus.OK,
        message: 'Product removed successfully from cart',
      };
    }

    await this.cartRepository.save({
      user: { id: userId },
      product: { id: productId },
    });

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Product added successfully to cart',
    };
  }
}
