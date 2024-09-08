import { Module } from '@nestjs/common';
import { ItemSubCategoryController } from './item-sub-category.controller';
import { ItemSubCategoryService } from './item-sub-category.service';

@Module({
  controllers: [ItemSubCategoryController],
  providers: [ItemSubCategoryService]
})
export class ItemSubCategoryModule {}
