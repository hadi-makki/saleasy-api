import { MainEntity } from 'src/main-classes/mainEntity';
import { Column, Entity } from 'typeorm';

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
    shippingFee: string;
  };

  @Column('jsonb', { nullable: false })
  Hero: {
    Carousel: {
      text1: string;
      text2: string;
      text3: string;
      link: {
        title: string;
        target: string;
      };
    }[];
    sideBoxes: {
      text1: string;
      text2: string;
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
    title: string;
    categoryId: string;
    type: sectionsTypes;
    advertisementSection: {
      text1: string;
      text2: string;
      redText: string;
      link: {
        title: string;
        target: string;
      };
    };
  };

  @Column('jsonb', { nullable: false })
  footer: {
    descriptionText: string;
  };
}
