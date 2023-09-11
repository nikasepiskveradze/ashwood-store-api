import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { Category } from '../categories/category.entity';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  findAll() {
    return this.repo.find({ relations: { categories: true } });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: { categories: true },
    });
  }

  create(productDto: CreateProductDto, image: Express.Multer.File) {
    const product = this.repo.create({
      title: productDto.title,
      short: productDto.short,
      long: productDto.long,
      quantity: parseFloat(productDto.quantity),
      price: parseFloat(productDto.price),
    });

    product.categories = productDto.categories.map((id) => ({
      id: parseInt(id),
    })) as Category[];

    product.image = image.path;

    return this.repo.save(product);
  }

  async update(
    productId: string,
    productDto: UpdateProductDto,
    image: Express.Multer.File,
  ) {
    const product = await this.repo.findOne({
      where: { id: parseInt(productId) },
      relations: { categories: true },
    });
    if (!product) {
      throw new NotFoundException('Product not found, can not update');
    }

    Object.assign(product, productDto);
    product.price = parseFloat(productDto.price);
    product.quantity = parseFloat(productDto.quantity);
    product.categories = productDto.categories.map((id) => ({
      id: parseInt(id),
    })) as Category[];
    product.image = image.path;

    return this.repo.save(product);
  }

  async delete(productId: string) {
    const product = await this.repo.findOneBy({ id: parseInt(productId) });
    if (!product) {
      throw new NotFoundException('Product not found, can not delete');
    }

    await this.repo.delete(product);
  }
}
