import { ItemCategoryEntity } from 'src/item-category/item-category.entity';
import { MainEntity } from 'src/main-classes/mainEntity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';

@Entity('links')
export class LinkEntity extends MainEntity {
  @Column('json', { nullable: false })
  carouselItems: {
    imageUrl: string;
    link: string;
    text1: string;
    text2: string;
    text3: string;
  }[];

  @Column('json', { nullable: false })
  categoriesSection: string[];
}
