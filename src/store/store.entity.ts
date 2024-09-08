import { ItemCategoryEntity } from 'src/item-category/item-category.entity';
import { ItemSubCategoryEntity } from 'src/item-sub-category/item-sub-category.entity';
import { ItemEntity } from 'src/item/item.entity';
import { LinkEntity } from 'src/link/link.entity';
import { MainEntity } from 'src/main-classes/mainEntity';
import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity('stores')
export class StoreEntity extends MainEntity {
  @Column('text', { nullable: false })
  name: string;

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
}
