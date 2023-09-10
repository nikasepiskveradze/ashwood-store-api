import {
  Body,
  Controller,
  Get,
  Param,
  Post,
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
}
