import { ItemEntity } from 'src/item/item.entity';
import { MainEntity } from 'src/main-classes/mainEntity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { OrderEntity } from './orders.entity';

@Entity('order_options')
export class OrderOptionsEntity extends MainEntity {
  @ManyToOne(() => ItemEntity, (item) => item.orderOptions)
  item: ItemEntity;

  @Column('jsonb', { nullable: true })
  options: {
    key: string;
    value: string;
  }[];

  @Column('int', { nullable: false })
  quantity: number;

  @ManyToOne(() => OrderEntity, (order) => order.orderOptions, {
    onDelete: 'CASCADE',
  })
  order: OrderEntity;
}
