import { ItemCategoryEntity } from 'src/item-category/item-category.entity';
import { MainEntity } from 'src/main-classes/mainEntity';
import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';

@Entity('item')
export class ItemEntity extends MainEntity {
  @Column('text', { nullable: false })
  title: string;

  @Column('text', { nullable: false })
  description: string;

  @Column('text', { nullable: false })
  price: string;

  @Column('text', { nullable: false })
  image: string[];

  @Column('text', { nullable: false })
  category: string;

  @Column('int', { nullable: false })
  stock: number;

  @ManyToOne(() => UserEntity, (user) => user.items, { nullable: false })
  user: UserEntity;

  @ManyToOne(() => ItemCategoryEntity, (itemCategory) => itemCategory.items, {
    nullable: false,
  })
  itemCategory: ItemCategoryEntity;
}
