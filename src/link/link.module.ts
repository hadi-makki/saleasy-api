import { Module } from '@nestjs/common';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkEntity } from './link.entity';
import { StoreEntity } from 'src/store/store.entity';
import { UserEntity } from 'src/user/user.entity';
import TokenEntity from 'src/token/token.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenService } from 'src/token/token.service';
import { MediaService } from 'src/media/media.service';
import { MediaEntity } from 'src/media/media.entity';
import { S3Service } from 'src/s3/s3.service';
import { ItemService } from 'src/item/item.service';
import { ItemEntity } from 'src/item/item.entity';
import { ItemCategoryEntity } from 'src/item-category/item-category.entity';
import { ItemSubCategoryEntity } from 'src/item-sub-category/item-sub-category.entity';

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
