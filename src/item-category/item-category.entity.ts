import { ItemEntity } from '../item/item.entity';
import { MainEntity } from '../main-classes/mainEntity';
import { UserEntity } from '../user/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ItemSubCategoryEntity } from '../item-sub-category/item-sub-category.entity';
import { StoreEntity } from '../store/store.entity';

@Entity('item-category')
export class ItemCategoryEntity extends MainEntity {
  @Column('text', { nullable: false })
  name: string;

  @Column('text', { nullable: false })
  description: string;

  @Column('text', { nullable: true })
  image: string;

  @OneToMany(
    () => ItemSubCategoryEntity,
    (subCategory) => subCategory.category,
    {
      cascade: ['remove'],
      onDelete: 'CASCADE',
    },
  )
  subCategories: ItemSubCategoryEntity[];

  @OneToMany(() => ItemEntity, (item) => item.category, {
    cascade: ['remove'],
    onDelete: 'CASCADE',
  })
  items: ItemEntity[];

  @ManyToOne(() => StoreEntity, (store) => store.categories)
  store: StoreEntity;
}
