import { ItemEntity } from 'src/item/item.entity';
import { MainEntity } from 'src/main-classes/mainEntity';
import { StoreEntity } from 'src/store/store.entity';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';

@Entity('orders')
export class OrderEntity extends MainEntity {
  @ManyToOne(() => StoreEntity, (store) => store.orders, {
    nullable: false,
    onDelete: 'CASCADE',
    cascade: true,
  })
  store: StoreEntity;

  @ManyToMany(() => ItemEntity, (item) => item.orders, {
    nullable: false,
    onDelete: 'CASCADE',
    cascade: true,
  })
  items: ItemEntity[];

  @Column('float', { nullable: false })
  total: number;

  @Column('jsonb', { nullable: true })
  orderOptions: {
    options: {
      key: string;
      value: string;
    }[];
    item: string;
    quantity: number;
  }[];

  @Column('jsonb', { nullable: true })
  shippingInfo: {
    name: string;
    country: string;
    company: string | null;
    address: string;
    city: string;
    method: 'ship' | 'pick';
  };
}
