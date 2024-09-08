import { Test, TestingModule } from '@nestjs/testing';
import { ItemReviewsService } from './item-reviews.service';

describe('ItemReviewsService', () => {
  let service: ItemReviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemReviewsService],
    }).compile();

    service = module.get<ItemReviewsService>(ItemReviewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
