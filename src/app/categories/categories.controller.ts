import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decoractor';
import { Role } from '../../enums/role.enum';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getAllCategories() {
    return this.categoriesService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  createCategory(@Body() body: CreateCategoryDto) {
    return this.categoriesService.create(body);
  }

  @Put('/:categoryId')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  updateCategory(
    @Param('categoryId') categoryId: string,
    @Body() body: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(parseInt(categoryId), body);
  }

  @Delete('/:categoryId')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  deleteCategory(@Param('categoryId') categoryId: string) {
    return this.categoriesService.delete(parseInt(categoryId));
  }
}
