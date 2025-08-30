import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './orders.entity';
import { ItemEntity } from '../item/item.entity';
import { UserEntity } from '../user/user.entity';
import TokenEntity from '../token/token.entity';
import { TokenService } from '../token/token.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { StoreEntity } from '../store/store.entity';
import { OrderOptionsEntity } from './order-options.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      ItemEntity,
      UserEntity,
      TokenEntity,
      StoreEntity,
      OrderOptionsEntity,
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, TokenService, JwtService, ConfigService],
})
export class OrdersModule {}
