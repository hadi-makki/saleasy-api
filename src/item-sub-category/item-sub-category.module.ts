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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ItemSubCategoryEntity,
      ItemCategoryEntity,
      UserEntity,
      TokenEntity,
    ]),
  ],
  controllers: [ItemSubCategoryController],
  providers: [ItemSubCategoryService, JwtService, TokenService, ConfigService],
})
export class ItemSubCategoryModule {}
