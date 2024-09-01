import { ItemEntity } from 'src/item/item.entity';
import { MainEntity } from 'src/main-classes/mainEntity';
import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity('item-category')
export class ItemCategoryEntity extends MainEntity {
  @Column('text', { nullable: false })
  name: string;

  @Column('text', { nullable: false })
  description: string;

  @Column('text', { nullable: true })
  image: string;

  @ManyToOne(() => UserEntity, (user) => user)
  user: UserEntity;

  @OneToMany(() => ItemEntity, (item) => item.itemCategory)
  items: ItemEntity[];
}
