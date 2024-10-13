import { MainEntity } from 'src/main-classes/mainEntity';
import { Column, Entity } from 'typeorm';

@Entity('footer')
export class FooterEntity extends MainEntity {
  @Column({ type: 'varchar', nullable: false })
  descriptionText: string;
}
