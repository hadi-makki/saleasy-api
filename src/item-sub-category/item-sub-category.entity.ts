import { MainEntity } from '../main-classes/mainEntity';
import { UserEntity } from '../user/user.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { ItemCategoryEntity } from '../item-category/item-category.entity';
import { ItemEntity } from '../item/item.entity';
import { StoreEntity } from '../store/store.entity';

@Entity('item_sub_categories')
export class ItemSubCategoryEntity extends MainEntity {
  @Column('text', { nullable: false })
  name: string;

  // @Column('text', { nullable: false })
  // description: string;

  @Column('text', { nullable: true })
  image: string;

  @ManyToOne(() => StoreEntity, (user) => user.subCategories)
  store: StoreEntity;

  @ManyToOne(() => ItemCategoryEntity, (category) => category.subCategories, {
    onDelete: 'CASCADE',
  })
  category: ItemCategoryEntity;

  @OneToMany(() => ItemEntity, (category) => category.subCategory)
  items: ItemEntity[];
}
