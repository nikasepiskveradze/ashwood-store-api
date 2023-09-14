import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(Category) private repo: Repository<Category>) {}

  findAll() {
    return this.repo.find();
  }

  create(categoryDto: CreateCategoryDto) {
    const category = this.repo.create(categoryDto);
    return this.repo.save(category);
  }

  async update(id: number, categoryDto: UpdateCategoryDto) {
    const category = await this.repo.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    category.name = categoryDto.name;

    return this.repo.save(category);
  }

  async delete(id: number) {
    const category = await this.repo.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('Can not delete category');
    }

    await this.repo.remove(category);
  }
}
