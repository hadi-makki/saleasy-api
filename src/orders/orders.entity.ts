import { ItemEntity } from 'src/item/item.entity';
import { MainEntity } from 'src/main-classes/mainEntity';
import { StoreEntity } from 'src/store/store.entity';
import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { OrderOptionsEntity } from './order-options.entity';

export enum OrderStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

@Entity('orders')
export class OrderEntity extends MainEntity {
  @ManyToOne(() => UserEntity, (user) => user.orders, {
    nullable: false,
    onDelete: 'CASCADE',
    cascade: true,
  })
  user: UserEntity;

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

  @OneToMany(() => OrderOptionsEntity, (orderOptions) => orderOptions.order, {
    nullable: false,
    onDelete: 'CASCADE',
    cascade: true,
  })
  orderOptions: OrderOptionsEntity[];

  @Column('jsonb', { nullable: true })
  shippingInfo: {
    name: string;
    country: string;
    company: string | null;
    address: string;
    city: string;
    method: 'ship' | 'pick';
  };

  @Column('enum', { enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;
}
