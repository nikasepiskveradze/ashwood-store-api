import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dtos/create-product.dto';
import { Serialize } from '../../interceptors/serialize.interceptor';
import { ProductDto } from './dtos/product.dto';
import { AuthGuard } from '../../guards/auth.guard';
import { UpdateProductDto } from './dtos/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAllProducts() {
    return this.productsService.findAll();
  }

  @Get('/:productId')
  getProduct(@Param('productId') productId: string) {
    return this.productsService.findOne(parseInt(productId));
  }

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ProductDto)
  @UseInterceptors(
    FileInterceptor('image', {
      dest: './uploads',
    }),
  )
  createProduct(
    @Body() body: CreateProductDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.productsService.create(body, image);
  }

  @Put('/:productId')
  @UseGuards(AuthGuard)
  @Serialize(ProductDto)
  @UseInterceptors(FileInterceptor('image', { dest: './uploads' }))
  updateProduct(
    @Param('productId') productId: string,
    @Body() body: UpdateProductDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.productsService.update(productId, body, image);
  }

  @Delete('/:productId')
  @UseGuards(AuthGuard)
  deleteProduct(@Param('productId') productId: string) {
    return this.productsService.delete(productId);
  }
}
