import { Test, TestingModule } from '@nestjs/testing';
import { ItemSubCategoryController } from './item-sub-category.controller';

describe('ItemSubCategoryController', () => {
  let controller: ItemSubCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemSubCategoryController],
    }).compile();

    controller = module.get<ItemSubCategoryController>(ItemSubCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
