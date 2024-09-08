import { MainEntity } from 'src/main-classes/mainEntity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import TokenEntity from 'src/token/token.entity';
import { ItemCategoryEntity } from 'src/item-category/item-category.entity';
import { BadRequestException } from 'src/error/bad-request-error';
import { ItemEntity } from 'src/item/item.entity';
import { ItemReviewEntity } from 'src/item-reviews/item-reviews.entity';
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}
@Entity('user')
export class UserEntity extends MainEntity {
  @Column('text', { nullable: false })
  email: string;

  @Column('text', { nullable: false })
  password: string;

  @Column('text', { nullable: false })
  name: string;

  @OneToOne(() => TokenEntity, (profile) => profile.user) // specify inverse side as a second parameter
  @JoinColumn()
  token: TokenEntity;

  @Column('enum', { enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @OneToMany(() => ItemCategoryEntity, (itemCategory) => itemCategory.user)
  itemCategories: ItemCategoryEntity[];

  @OneToMany(() => ItemEntity, (item) => item.user)
  items: ItemEntity[];

  @OneToMany(() => ItemReviewEntity, (itemReview) => itemReview.user)
  reviews: ItemReviewEntity[];

  async comparePassword(oldPassword: string) {
    return await bcrypt.compare(oldPassword, this.password);
  }

  // constraints for user entity
  // only admins can have item categories
  @BeforeInsert()
  @BeforeUpdate()
  async checkItemCategoriesConstraint() {
    if (
      this.role !== UserRole.ADMIN &&
      this.itemCategories &&
      this.itemCategories.length > 0
    ) {
      throw new BadRequestException('Only admins can have item categories.');
    }
  }

  // only admins can have items
  @BeforeInsert()
  @BeforeUpdate()
  async checkItemsConstraint() {
    if (this.role !== UserRole.ADMIN && this.items && this.items.length > 0) {
      throw new BadRequestException('Only admins can have items.');
    }
  }
}
