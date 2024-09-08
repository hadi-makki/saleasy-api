import { Test, TestingModule } from '@nestjs/testing';
import { ItemSubCategoryService } from './item-sub-category.service';

describe('ItemSubCategoryService', () => {
  let service: ItemSubCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemSubCategoryService],
    }).compile();

    service = module.get<ItemSubCategoryService>(ItemSubCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
