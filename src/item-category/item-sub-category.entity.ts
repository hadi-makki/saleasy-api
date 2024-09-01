import { MainEntity } from 'src/main-classes/mainEntity';
import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { ItemCategoryEntity } from './item-category.entity';
import { ItemEntity } from 'src/item/item.entity';

@Entity('item_sub_categories')
export class ItemSubCategoryEntity extends MainEntity {
  @Column('text', { nullable: false })
  name: string;

  @Column('text', { nullable: false })
  description: string;

  @Column('text', { nullable: true })
  image: string;

  @ManyToOne(() => UserEntity, (user) => user)
  user: UserEntity;

  @ManyToOne(() => ItemCategoryEntity, (category) => category.subCategories)
  category: ItemCategoryEntity;

  @ManyToMany(() => ItemEntity, (category) => category.subCategories)
  items: ItemEntity[];
}
