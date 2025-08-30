import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreEntity } from './store.entity';
import { MediaService } from '../media/media.service';
import { MediaEntity } from '../media/media.entity';
import { S3Service } from '../s3/s3.service';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '../token/token.service';
import TokenEntity from '../token/token.entity';
import { LinkEntity } from '../link/link.entity';
import { ItemService } from '../item/item.service';
import { ItemEntity } from '../item/item.entity';
import { ItemCategoryEntity } from '../item-category/item-category.entity';
import { ItemSubCategoryEntity } from '../item-sub-category/item-sub-category.entity';
import { OrderEntity } from '../orders/orders.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StoreEntity,
      MediaEntity,
      UserEntity,
      TokenEntity,
      LinkEntity,
      ItemEntity,
      ItemCategoryEntity,
      ItemSubCategoryEntity,
      OrderEntity,
    ]),
  ],
  controllers: [StoreController],
  providers: [
    StoreService,
    MediaService,
    S3Service,
    ConfigService,
    JwtService,
    TokenService,
    ItemService,
  ],
})
export class StoreModule {}
