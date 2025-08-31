import { ItemCategoryEntity } from '../item-category/item-category.entity';
import { ItemSubCategoryEntity } from '../item-sub-category/item-sub-category.entity';
import { ItemEntity } from '../item/item.entity';
import { LinkEntity } from '../link/link.entity';
import { MainEntity } from '../main-classes/mainEntity';
import { OrderEntity } from '../orders/orders.entity';
import { UserEntity } from '../user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity('stores')
export class StoreEntity extends MainEntity {
  @Column('text', { nullable: false, unique: true })
  name: string;

  @Column('text', { nullable: true })
  dashedName: string;

  @Column('text', { nullable: false })
  description: string;

  @Column('uuid', { nullable: true })
  logo: string;

  @Column('text', { nullable: true })
  address: string;

  @Column('text', { nullable: true })
  phone: string;

  @Column('text', { nullable: true })
  email: string;

  @Column('bool', { nullable: false, default: true })
  isPublished: boolean;

  @ManyToOne(() => UserEntity, (user) => user.stores, { nullable: false })
  user: UserEntity;

  @OneToMany(() => ItemEntity, (item) => item.store)
  items: ItemEntity[];

  @OneToMany(() => ItemCategoryEntity, (category) => category.store)
  categories: ItemCategoryEntity[];

  @OneToMany(() => ItemSubCategoryEntity, (subCategory) => subCategory.store)
  subCategories: ItemSubCategoryEntity[];

  @OneToOne(() => LinkEntity, (link) => link.store, { nullable: true })
  @JoinColumn()
  link: LinkEntity;

  @OneToMany(() => OrderEntity, (order) => order.store)
  orders: OrderEntity[];

  @ManyToMany(() => UserEntity, (user) => user.customersFor)
  @JoinTable()
  customers: UserEntity[];
}
