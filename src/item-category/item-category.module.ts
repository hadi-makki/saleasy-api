import { Module } from '@nestjs/common';
import { ItemCategoryService } from './item-category.service';
import { ItemCategoryController } from './item-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemCategoryEntity } from './item-category.entity';
import { UserEntity } from '../user/user.entity';
import { TokenService } from '../token/token.service';
import { JwtService } from '@nestjs/jwt';
import TokenEntity from '../token/token.entity';
import { ConfigService } from '@nestjs/config';
import { StoreEntity } from '../store/store.entity';
import { MediaService } from '../media/media.service';
import { MediaEntity } from '../media/media.entity';
import { S3Service } from '../s3/s3.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ItemCategoryEntity,
      UserEntity,
      TokenEntity,
      StoreEntity,
      MediaEntity,
    ]),
  ],
  providers: [
    ItemCategoryService,
    TokenService,
    JwtService,
    ConfigService,
    MediaService,
    S3Service,
  ],
  controllers: [ItemCategoryController],
})
export class ItemCategoryModule {}
