import { MainEntity } from 'src/main-classes/mainEntity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { SocialLinksEntity } from './social-links.entity';

@Entity('header')
export class HeaderEntity extends MainEntity {
  @Column({ type: 'varchar', nullable: false })
  logo: string;

  @Column({ type: 'integer', nullable: false })
  logoSize: number;

  @Column({ type: 'varchar', nullable: false })
  shippingFee: string;

  @OneToOne(() => SocialLinksEntity, { cascade: true, eager: true })
  @JoinColumn()
  links: SocialLinksEntity;
}
