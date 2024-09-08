import { Test, TestingModule } from '@nestjs/testing';
import { ItemReviewsController } from './item-reviews.controller';

describe('ItemReviewsController', () => {
  let controller: ItemReviewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemReviewsController],
    }).compile();

    controller = module.get<ItemReviewsController>(ItemReviewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
