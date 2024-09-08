import { ItemEntity } from 'src/item/item.entity';
import { MainEntity } from 'src/main-classes/mainEntity';
import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('item_reviews')
export class ItemReviewEntity extends MainEntity {
  @Column('text', { nullable: false })
  title: string;

  @Column('text', { nullable: false })
  description: string;

  @Column('int', { nullable: false })
  rating: number;

  @ManyToOne(() => UserEntity, (user) => user.reviews, { nullable: false })
  user: UserEntity;

  @ManyToOne(() => ItemEntity, (item) => item.itemReviews, { nullable: false })
  item: ItemEntity;
}
