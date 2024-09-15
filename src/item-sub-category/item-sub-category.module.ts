import { Module } from '@nestjs/common';
import { ItemSubCategoryController } from './item-sub-category.controller';
import { ItemSubCategoryService } from './item-sub-category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemSubCategoryEntity } from './item-sub-category.entity';
import { ItemCategoryEntity } from 'src/item-category/item-category.entity';
import { UserEntity } from 'src/user/user.entity';
import TokenEntity from 'src/token/token.entity';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/token/token.service';
import { ConfigService } from '@nestjs/config';
import { ItemService } from 'src/item/item.service';
import { ItemEntity } from 'src/item/item.entity';
import { StoreEntity } from 'src/store/store.entity';
import { MediaService } from 'src/media/media.service';
import { MediaEntity } from 'src/media/media.entity';
import { S3Service } from 'src/s3/s3.service';

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
