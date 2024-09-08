import { Module } from '@nestjs/common';
import { ItemReviewsController } from './item-reviews.controller';
import { ItemReviewsService } from './item-reviews.service';

@Module({
  controllers: [ItemReviewsController],
  providers: [ItemReviewsService]
})
export class ItemReviewsModule {}
