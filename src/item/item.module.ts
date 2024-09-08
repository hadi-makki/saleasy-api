import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemEntity } from './item.entity';
import { ItemCategoryEntity } from 'src/item-category/item-category.entity';
import { ItemSubCategoryEntity } from 'src/item-sub-category/item-sub-category.entity';
import { StoreEntity } from 'src/store/store.entity';
import { UserEntity } from 'src/user/user.entity';
import TokenEntity from 'src/token/token.entity';
import { ConfigService } from '@nestjs/config';
import { TokenService } from 'src/token/token.service';
import { JwtService } from '@nestjs/jwt';
import { MediaService } from 'src/media/media.service';
import { MediaEntity } from 'src/media/media.entity';
import { S3Service } from 'src/s3/s3.service';

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
