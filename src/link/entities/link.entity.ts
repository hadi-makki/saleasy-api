import { MainEntity } from 'src/main-classes/mainEntity';
import { StoreEntity } from 'src/store/store.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HeaderEntity } from './header.entity';
import { HeroEntity } from './hero.entity';
import { SectionEntity, sectionsTypes } from './section.entity';
import { FooterEntity } from './footer.entity';
import { SocialLinksEntity } from './social-links.entity';

@Entity('links')
export class LinkEntity extends MainEntity {
  @OneToOne(() => HeaderEntity, { cascade: true, eager: true })
  @JoinColumn()
  header: HeaderEntity;

  @OneToOne(() => HeroEntity, { cascade: true, eager: true })
  @JoinColumn()
  hero: HeroEntity;

  @Column('text', { array: true, nullable: false })
  categoryItems: string[];

  @OneToMany(() => SectionEntity, (section) => section.link, {
    cascade: true,
    eager: true,
  })
  sections: SectionEntity[];

  @OneToOne(() => FooterEntity, { cascade: true, eager: true })
  @JoinColumn()
  footer: FooterEntity;

  @OneToOne(() => StoreEntity, (store) => store.link)
  store: StoreEntity;
}

export const defaultHeader = {
  links: {
    instagram: '',
    facebook: '',
    twitter: '',
  },
  logo: '7c732995-436b-44cc-953c-eb986dc8e5ed',
  logoSize: 100,
  shippingFee: 'Free Express Shipping',
};
export const defaultHero = {
  Carousel: [
    {
      id: '1',
      text1: 'LIFESTYLE COLLECTION',
      text2: 'MEN',
      text3: 'SALE UP TO',
      text4: '30% OFF',
      backgroundImage: '7990afbc-56cc-4427-bbde-b04735bae70c',
      link: {
        title: 'SHOP NOW',
        target: '',
      },
    },
  ],
  sideBoxes: [
    {
      id: '1',
      backgroundImage: '96a2c92f-0dee-4b59-b158-cc7038739964',
      text1: 'NEW ARRIVALS',
      text2: 'SUMMER',
      text3: 'SALE 20% OFF',
      link: {
        title: 'more proucts',
        target: '',
      },
    },
    {
      id: '2',
      backgroundImage: '3284596c-1b36-496e-8e60-d53a8a186237',
      text1: 'NEW ARRIVALS',
      text2: 'SUMMER',
      text3: 'SALE 20% OFF',
      link: {
        title: 'more proucts',
        target: '',
      },
    },
  ],
};
export const defaultCategoryItems = [];
export const defaultSections = [
  {
    id: '1',
    title: 'section 1',
    categoryId: '',
    type: sectionsTypes.deals_of_the_day,
    advertisementSection: [
      {
        id: '1',
        text1: 'NEW ARRIVALS',
        text2: 'SKI CLOTHES SALE',
        redText: 'Up to 35% Off',
        backgroundImage: '3284596c-1b36-496e-8e60-d53a8a186237',
        link: {
          title: 'SHOP NOW',
          target: '#',
        },
      },
    ],
    items: null,
  },
  {
    id: '2',
    title: 'section 2',
    categoryId: '',
    type: sectionsTypes.manually_selected,
    items: [],
    advertisementSection: null,
  },
  {
    id: '3',
    title: 'section 3',
    categoryId: 'e3771f0d-19f8-4213-b0cd-5871bca515be',
    type: sectionsTypes.category_related,
    items: null,
    advertisementSection: null,
  },
];
export const defaultFooter = {
  descriptionText: '',
};
export const allDefault = {
  header: defaultHeader,
  Hero: defaultHero,
  categoryItems: defaultCategoryItems,
  sections: defaultSections,
  footer: defaultFooter,
};
