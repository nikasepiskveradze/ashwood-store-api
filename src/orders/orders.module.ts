import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Order])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
