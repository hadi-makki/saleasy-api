import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './orders.entity';
import { ItemEntity } from 'src/item/item.entity';
import { UserEntity } from 'src/user/user.entity';
import TokenEntity from 'src/token/token.entity';
import { TokenService } from 'src/token/token.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      ItemEntity,
      UserEntity,
      TokenEntity,
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, TokenService, JwtService, ConfigService],
})
export class OrdersModule {}
