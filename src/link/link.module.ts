import { Module } from '@nestjs/common';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkEntity } from './link.entity';
import { StoreEntity } from '../store/store.entity';
import { UserEntity } from '../user/user.entity';
import TokenEntity from '../token/token.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenService } from '../token/token.service';
import { MediaService } from '../media/media.service';
import { MediaEntity } from '../media/media.entity';
import { S3Service } from '../s3/s3.service';
import { ItemService } from '../item/item.service';
import { ItemEntity } from '../item/item.entity';
import { ItemCategoryEntity } from '../item-category/item-category.entity';
import { ItemSubCategoryEntity } from '../item-sub-category/item-sub-category.entity';
import { OrderEntity } from '../orders/orders.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LinkEntity,
      StoreEntity,
      UserEntity,
      TokenEntity,
      MediaEntity,
      ItemEntity,
      ItemCategoryEntity,
      ItemSubCategoryEntity,
      OrderEntity,
    ]),
  ],
  controllers: [LinkController],
  providers: [
    LinkService,
    JwtService,
    ConfigService,
    TokenService,
    MediaService,
    S3Service,
    ItemService,
  ],
})
export class LinkModule {}
