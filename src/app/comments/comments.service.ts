import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { Product } from '../products/product.entity';
import { User } from '../users/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getProductComments(productId: string) {
    const product = await this.productRepository.findOneBy({
      id: parseInt(productId),
    });

    if (!product) {
      throw new NotFoundException('Product not found, can not fetch comments');
    }

    const comments = await this.commentRepository.find({
      where: { product: product },
    });

    return comments;
  }

  async create(commentDto: CreateCommentDto, userId: number) {
    const product = await this.productRepository.findOneBy({
      id: commentDto.productId,
    });

    if (!product) {
      throw new NotFoundException(
        'Product did not find, can not create comment',
      );
    }

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User did not find, can not create comment');
    }

    const comment = this.commentRepository.create({
      comment: commentDto.comment,
      product: product,
      user: user,
    });

    return this.commentRepository.save(comment);
  }
}
