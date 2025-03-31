import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { AuthGuard } from '../../guards/auth.guard';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { AddProductToFavoritesDto } from './dtos/add-product-to-favorites.dto';
import { PaginationDto } from '../../dtos/pagination.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  @UseGuards(AuthGuard)
  getUserFavorites(@CurrentUser() user: User, @Query() query: PaginationDto) {
    return this.favoritesService.findAll(user.id, query);
  }

  @Post()
  @UseGuards(AuthGuard)
  addOrRemoveFavorites(
    @CurrentUser() user: User,
    @Body() body: AddProductToFavoritesDto,
  ) {
    return this.favoritesService.addOrRemoveFavorites({
      userId: user.id,
      productId: body.productId,
    });
  }
}
