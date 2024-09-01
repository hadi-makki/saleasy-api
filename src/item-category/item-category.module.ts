import { Module } from '@nestjs/common';
import { ItemCategoryService } from './item-category.service';
import { ItemCategoryController } from './item-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemCategoryEntity } from './item-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ItemCategoryEntity])],
  providers: [ItemCategoryService],
  controllers: [ItemCategoryController],
})
export class ItemCategoryModule {}
