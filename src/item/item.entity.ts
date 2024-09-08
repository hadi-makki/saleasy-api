import { UnauthorizedException } from 'src/error/unauthorized-error';
import { ItemCategoryEntity } from 'src/item-category/item-category.entity';
import { ItemSubCategoryEntity } from 'src/item-category/item-sub-category.entity';
import { ItemReviewEntity } from 'src/item-reviews/item-reviews.entity';
import { MainEntity } from 'src/main-classes/mainEntity';
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

  @Column('number', { nullable: false })
  discount: number;

  @Column('text', { nullable: false })
  image: string[];

  @Column('text', { nullable: false })
  category: string;

  @Column('int', { nullable: false })
  stock: number;

  @BeforeUpdate()
  @BeforeInsert()
  // check if the user role is admin
  async checkUserRole() {
    if (this.user.role !== 'admin') {
      throw new UnauthorizedException(
        'You are not authorized to perform this action',
      );
    }
  }
  @ManyToOne(() => UserEntity, (user) => user.items, { nullable: false })
  user: UserEntity;

  @ManyToMany(
    () => ItemSubCategoryEntity,
    (subCategories) => subCategories.items,
  )
  subCategories: ItemSubCategoryEntity[];

  @OneToMany(() => ItemReviewEntity, (itemReview) => itemReview.item)
  itemReviews: ItemReviewEntity[];
}
