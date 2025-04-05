import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post('/checkout')
  @UseGuards(AuthGuard)
  checkout() {
    return this.ordersService.checkout();
  }
}
