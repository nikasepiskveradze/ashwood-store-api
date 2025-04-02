import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from '../../guards/auth.guard';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { ToggleProductInCartDto } from './dtos/toggle-product-in-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  @UseGuards(AuthGuard)
  getCarts(@CurrentUser() user: User) {
    return this.cartService.findAll(user.id);
  }

  @Post()
  @UseGuards(AuthGuard)
  addOrRemoveProductFromCart(
    @CurrentUser() user: User,
    @Body() body: ToggleProductInCartDto,
  ) {
    return this.cartService.createOrUpdateCart({
      userId: user.id,
      productId: body.productId,
    });
  }
}
