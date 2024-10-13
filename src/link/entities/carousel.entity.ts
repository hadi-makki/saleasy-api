import { MainEntity } from 'src/main-classes/mainEntity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { HeroEntity } from './hero.entity';
import { LinkDetailEntity } from './link-details.entity';

@Entity('carousel')
export class CarouselEntity extends MainEntity {
  @ManyToOne(() => HeroEntity, (hero) => hero.carousel)
  hero: HeroEntity;

  @Column({ type: 'varchar', nullable: false })
  text1: string;

  @Column({ type: 'varchar', nullable: false })
  text2: string;

  @Column({ type: 'varchar', nullable: false })
  text3: string;

  @Column({ type: 'varchar', nullable: false })
  text4: string;

  @Column({ type: 'varchar', nullable: false })
  backgroundImage: string;

  @OneToOne(() => LinkDetailEntity, { cascade: true, eager: true })
  @JoinColumn()
  link: LinkDetailEntity;
}
