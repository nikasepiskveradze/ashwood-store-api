import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

    const totalPrice = allCarts.reduce((total, item) => {
      return total + item.quantity * item.product.price;
    }, 0);

    return {
      items: allCarts,
      totalPrice: totalPrice,
    };
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

  async addQuantity({
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

    if (!cartItem) {
      throw new NotFoundException('Product not found');
    }

    cartItem.quantity += 1;

    return this.cartRepository.save(cartItem);
  }

  async removeQuantity({
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

    if (!cartItem) {
      throw new NotFoundException('Product not found');
    }

    if (cartItem.quantity - 1 === 0) {
      throw new BadRequestException('Quantity should be greater than 0');
    }

    cartItem.quantity -= 1;

    return this.cartRepository.save(cartItem);
  }
}
