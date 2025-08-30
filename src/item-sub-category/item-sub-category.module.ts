import { Module } from '@nestjs/common';
import { ItemSubCategoryController } from './item-sub-category.controller';
import { ItemSubCategoryService } from './item-sub-category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemSubCategoryEntity } from './item-sub-category.entity';
import { ItemCategoryEntity } from '../item-category/item-category.entity';
import { UserEntity } from '../user/user.entity';
import TokenEntity from '../token/token.entity';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from '../token/token.service';
import { ConfigService } from '@nestjs/config';
import { ItemService } from '../item/item.service';
import { ItemEntity } from '../item/item.entity';
import { StoreEntity } from '../store/store.entity';
import { MediaService } from '../media/media.service';
import { MediaEntity } from '../media/media.entity';
import { S3Service } from '../s3/s3.service';
import { OrderEntity } from '../orders/orders.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ItemSubCategoryEntity,
      ItemCategoryEntity,
      UserEntity,
      TokenEntity,
      ItemEntity,
      ItemEntity,
      StoreEntity,
      OrderEntity,
      MediaEntity,
    ]),
  ],
  controllers: [ItemSubCategoryController],
  providers: [
    ItemSubCategoryService,
    JwtService,
    TokenService,
    ConfigService,
    ItemService,
    MediaService,
    S3Service,
  ],
})
export class ItemSubCategoryModule {}
