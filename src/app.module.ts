import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { APP_PIPE } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import typeorm from '../config/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { CommentsModule } from './comments/comments.module';
import { FavoritesModule } from './favorites/favorites.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    UsersModule,
    AuthModule,
    RolesModule,
    CategoriesModule,
    ProductsModule,
    CommentsModule,
    FavoritesModule,
    CartModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true }),
    },
  ],
})
export class AppModule {}
