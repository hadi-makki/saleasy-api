import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemEntity } from './item.entity';
import { ItemCategoryEntity } from '../item-category/item-category.entity';
import { ItemSubCategoryEntity } from '../item-sub-category/item-sub-category.entity';
import { StoreEntity } from '../store/store.entity';
import { UserEntity } from '../user/user.entity';
import TokenEntity from '../token/token.entity';
import { ConfigService } from '@nestjs/config';
import { TokenService } from '../token/token.service';
import { JwtService } from '@nestjs/jwt';
import { MediaService } from '../media/media.service';
import { MediaEntity } from '../media/media.entity';
import { S3Service } from '../s3/s3.service';
import { OrdersService } from '../orders/orders.service';
import { OrderEntity } from '../orders/orders.entity';
import { OrderOptionsEntity } from '../orders/order-options.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ItemEntity,
      ItemCategoryEntity,
      ItemSubCategoryEntity,
      StoreEntity,
      UserEntity,
      TokenEntity,
      MediaEntity,
      OrderEntity,
    ]),
  ],
  providers: [
    ItemService,
    JwtService,
    TokenService,
    ConfigService,
    MediaService,
    S3Service,
  ],
  controllers: [ItemController],
})
export class ItemModule {}
