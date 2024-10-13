import { MainEntity } from 'src/main-classes/mainEntity';
import { Entity, OneToMany } from 'typeorm';
import { CarouselEntity } from './carousel.entity';
import { SideBoxEntity } from './side-box.entity';

@Entity('hero')
export class HeroEntity extends MainEntity {
  @OneToMany(() => CarouselEntity, (carousel) => carousel.hero, {
    cascade: true,
    eager: true,
  })
  carousel: CarouselEntity[];

  @OneToMany(() => SideBoxEntity, (sideBox) => sideBox.hero, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  sideBoxes: SideBoxEntity[];
}
