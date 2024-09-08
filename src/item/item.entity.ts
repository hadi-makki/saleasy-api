import { UnauthorizedException } from 'src/error/unauthorized-error';
import { ItemCategoryEntity } from 'src/item-category/item-category.entity';
import { ItemSubCategoryEntity } from 'src/item-category/item-sub-category.entity';
import { ItemReviewEntity } from 'src/item-reviews/item-reviews.entity';
import { MainEntity } from 'src/main-classes/mainEntity';
import { StoreEntity } from 'src/store/store.entity';
import { UserEntity } from 'src/user/user.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('item')
export class ItemEntity extends MainEntity {
  @Column('text', { nullable: false })
  title: string;

  @Column('text', { nullable: false })
  description: string;

  @Column('text', { nullable: false })
  price: string;

  @Column('int', { nullable: false })
  discount: number;

  @Column('text', { nullable: false })
  image: string[];

  @Column('int', { nullable: false })
  stock: number;

  @ManyToMany(
    () => ItemSubCategoryEntity,
    (subCategories) => subCategories.items,
  )
  subCategories: ItemSubCategoryEntity[];

  @OneToMany(() => ItemReviewEntity, (itemReview) => itemReview.item)
  itemReviews: ItemReviewEntity[];

  @ManyToOne(() => StoreEntity, (store) => store.items, { nullable: false })
  store: StoreEntity;
}
