import { MainEntity } from 'src/main-classes/mainEntity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { LinkEntity } from './link.entity';

@Entity('social_links')
export class SocialLinksEntity extends MainEntity {
  @Column({ type: 'varchar', nullable: false })
  instagram: string;

  @Column({ type: 'varchar', nullable: false })
  facebook: string;

  @Column({ type: 'varchar', nullable: false })
  twitter: string;
}
