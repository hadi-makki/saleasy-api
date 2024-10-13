import { MainEntity } from 'src/main-classes/mainEntity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { SectionEntity } from './section.entity';
import { LinkDetailEntity } from './link-details.entity';

@Entity('advertisement_section')
export class AdvertisementSectionEntity extends MainEntity {
  @ManyToOne(() => SectionEntity, (section) => section.advertisementSection, {
    onDelete: 'CASCADE',
  })
  section: SectionEntity;

  @Column({ type: 'varchar', nullable: false })
  text1: string;

  @Column({ type: 'varchar', nullable: false })
  text2: string;

  @Column({ type: 'varchar', nullable: false })
  redText: string;

  @Column({ type: 'varchar', nullable: false })
  backgroundImage: string;

  @OneToOne(() => LinkDetailEntity, { cascade: true, eager: true })
  @JoinColumn()
  link: LinkDetailEntity;
}
