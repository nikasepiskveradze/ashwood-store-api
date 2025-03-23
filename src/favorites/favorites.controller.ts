import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { AuthGuard } from '../../guards/auth.guard';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { AddProductToFavorites } from './dtos/add-product-to-favorites';

@Controller('favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  @UseGuards(AuthGuard)
  getUserFavorites(@CurrentUser() user: User) {
    return this.favoritesService.findAll(user.id);
  }

  @Post()
  @UseGuards(AuthGuard)
  addOrRemoveFavorites(
    @CurrentUser() user: User,
    @Body() body: AddProductToFavorites,
  ) {
    return this.favoritesService.addOrRemoveFavorites({
      userId: user.id,
      productId: body.productId,
    });
  }
}
