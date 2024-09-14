import { ItemCategoryEntity } from 'src/item-category/item-category.entity';

import { ItemSubCategoryEntity } from 'src/item-sub-category/item-sub-category.entity';
import { MainEntity } from 'src/main-classes/mainEntity';
import { OrderEntity } from 'src/orders/orders.entity';
import { StoreEntity } from 'src/store/store.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('item')
export class ItemEntity extends MainEntity {
  @Column('text', { nullable: false })
  name: string;

  @Column('text', { nullable: false })
  description: string;

  @Column('int', { nullable: false, default: 0 })
  price: number;

  @Column('int', { nullable: false, default: 0 })
  discount: number;

  @Column('jsonb', { nullable: false, default: [] })
  images: string[];

  @Column('int', { nullable: false })
  stock: number;

  @Column('jsonb', {
    nullable: false,
    default: [
      {
        name: 'Color',
        options: ['Red', 'Blue', 'Green'],
      },
    ],
  })
  options: { name: string; options: string[] }[];

  @ManyToOne(
    () => ItemSubCategoryEntity,
    (subCategories) => subCategories.items,
    {
      onDelete: 'CASCADE',
      cascade: true,
    },
  )
  subCategory: ItemSubCategoryEntity;

  @ManyToOne(() => ItemCategoryEntity, (categories) => categories.items, {
    nullable: false,
    onDelete: 'CASCADE',
    cascade: true,
  })
  category: ItemCategoryEntity;

  @ManyToOne(() => StoreEntity, (store) => store.items, {
    nullable: false,
    onDelete: 'CASCADE',
    cascade: true,
  })
  store: StoreEntity;

  @ManyToMany(() => OrderEntity, (order) => order.items)
  @JoinTable()
  orders: OrderEntity[];
}
