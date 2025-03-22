import { Controller, Get, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { AuthGuard } from '../../guards/auth.guard';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { User } from '../users/user.entity';

@Controller('favorites')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  @UseGuards(AuthGuard)
  getUserFavorites(@CurrentUser() user: User) {
    return this.favoritesService.findAll(user.id);
  }
}
