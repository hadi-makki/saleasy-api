import { MainEntity } from 'src/main-classes/mainEntity';
import { HeroEntity } from './hero.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { LinkDetailEntity } from './link-details.entity';

@Entity('side_box')
export class SideBoxEntity extends MainEntity {
  @ManyToOne(() => HeroEntity, (hero) => hero.sideBoxes, {
    onDelete: 'CASCADE',
  })
  hero: HeroEntity;

  @Column({ type: 'varchar', nullable: false })
  backgroundImage: string;

  @Column({ type: 'varchar', nullable: false })
  text1: string;

  @Column({ type: 'varchar', nullable: false })
  text2: string;

  @Column({ type: 'varchar', nullable: false })
  text3: string;

  @OneToOne(() => LinkDetailEntity, { cascade: true, eager: true })
  @JoinColumn()
  link: LinkDetailEntity;
}
