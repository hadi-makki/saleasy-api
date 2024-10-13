import { MainEntity } from 'src/main-classes/mainEntity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { LinkEntity } from './link.entity';
import { AdvertisementSectionEntity } from './advertisment-section.entity';

export enum sectionsTypes {
  deals_of_the_day = 'deals_of_the_day',
  manually_selected = 'manually_selected',
  category_related = 'category_related',
}

@Entity('section')
export class SectionEntity extends MainEntity {
  @ManyToOne(() => LinkEntity, (link) => link.sections)
  link: LinkEntity;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: true })
  categoryId: string;

  @Column({
    type: 'enum',
    enum: sectionsTypes,
    default: sectionsTypes.deals_of_the_day,
    nullable: false,
  })
  type: sectionsTypes;

  @Column('text', { array: true, nullable: true })
  items: string[];

  @OneToMany(
    () => AdvertisementSectionEntity,
    (adSection) => adSection.section,
    { cascade: true, eager: true, nullable: true, onDelete: 'CASCADE' },
  )
  advertisementSection: AdvertisementSectionEntity[] | null;
}
