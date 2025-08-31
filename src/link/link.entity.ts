import { MainEntity } from '../main-classes/mainEntity';
import { StoreEntity } from '../store/store.entity';
import { Column, Entity, OneToOne } from 'typeorm';

export enum sectionsTypes {
  deals_of_the_day = 'deals_of_the_day',
  manually_selected = 'manually_selected',
  category_related = 'category_related',
}
@Entity('links')
export class LinkEntity extends MainEntity {
  @Column('jsonb', { nullable: false })
  header: {
    links: {
      instagram: string;
      facebook: string;
      twitter: string;
    };
    logo: string;
    logoSize: number;
    shippingFee: string;
  };

  @Column('jsonb', { nullable: false })
  Hero: {
    Carousel: {
      id: string;
      text1: string;
      text2: string;
      text3: string;
      text4: string;
      backgroundImage: string;
      link: {
        title: string;
        target: string;
      };
    }[];
    sideBoxes: {
      id: string;
      backgroundImage: string;
      text1: string;
      text2: string;
      text3: string;
      link: {
        title: string;
        target: string;
      };
    }[];
  };

  @Column('jsonb', { nullable: false })
  categoryItems: string[];

  @Column('jsonb', { nullable: false })
  sections: {
    id: string;
    title: string;
    categoryId: string;
    items: string[];
    type: sectionsTypes;
    advertisementSection: {
      backgroundImage: string;
      id: string;
      text1: string;
      text2: string;
      redText: string;
      link: {
        title: string;
        target: string;
      };
    }[];
  }[];

  @Column('jsonb', { nullable: false })
  footer: {
    descriptionText: string;
  };

  @Column('jsonb', {
    nullable: false,
    default: {
      colors: {
        primary: '#2b3445',
        secondary: '#ffffff',
        success: '#72e128',
        error: '#d23f57',
      },
    },
  })
  theme: {
    colors: {
      primary: string;
      secondary: string;
      success: string;
      warning: string;
      error: string;
    };
  };

  @OneToOne(() => StoreEntity, (store) => store.link)
  store: StoreEntity;
}
// export const defaultHeader = {
//   links: {
//     instagram: '',
//     facebook: '',
//     twitter: '',
//   },
//   logo: '62df0584-a4b0-4dcd-90e0-dcf530fbdf81',
//   logoSize: 100,
//   shippingFee: 'Free Express Shipping',
// };
export const defaultHeader = {
  logo: '',
  links: {
    twitter: '',
    facebook: '',
    instagram: '',
  },
  logoSize: 100,
  shippingFee: 'Free Express Shipping',
  isNewUploaded: true,
};
export const defaultHero = {
  Carousel: [
    {
      id: '1',
      link: {
        title: 'SHOP NOW',
        target: '',
      },
      text1: 'LIFESTYLE COLLECTION',
      text2: 'MEN',
      text3: 'SALE UP TO',
      text4: '30% OFF',
      backgroundImage: '7990afbc-56cc-4427-bbde-b04735bae70c',
    },
  ],
  sideBoxes: [
    {
      id: '1',
      link: {
        title: 'more proucts',
        target: '',
      },
      text1: 'NEW ARRIVALS',
      text2: 'SUMMER',
      text3: 'SALE 20% OFF',
      backgroundImage: '96a2c92f-0dee-4b59-b158-cc7038739964',
    },
    {
      id: '2',
      link: {
        title: 'more proucts',
        target: '',
      },
      text1: 'NEW ARRIVALS',
      text2: 'SUMMER',
      text3: 'SALE 20% OFF',
      backgroundImage: '3284596c-1b36-496e-8e60-d53a8a186237',
    },
  ],
};
export const defaultCategoryItems = [];
export const defaultSections = [
  {
    id: '1',
    type: sectionsTypes.deals_of_the_day,
    items: null,
    title: 'section 1',
    categoryId: '',
    advertisementSection: [
      {
        id: '1',
        link: {
          title: 'SHOP NOW',
          target: '#',
        },
        text1: 'NEW ARRIVALS',
        text2: 'SKI CLOTHES SALE',
        redText: 'Up to 35% Off',
        backgroundImage: '3284596c-1b36-496e-8e60-d53a8a186237',
      },
    ],
  },
  {
    id: '2',
    type: sectionsTypes.manually_selected,
    items: [],
    title: 'section 2',
    categoryId: '',
    advertisementSection: [],
  },
  {
    id: '3',
    type: sectionsTypes.category_related,
    items: null,
    title: 'section 3',
    categoryId: '9c42c082-42d1-4567-9c61-002aaa7b384d',
    advertisementSection: [],
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
