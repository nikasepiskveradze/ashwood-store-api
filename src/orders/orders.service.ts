import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersService {
  checkout() {
    console.log('Checkout Service');
  }
}
