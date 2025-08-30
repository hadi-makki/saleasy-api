import * as bcrypt from 'bcryptjs';
import { BadRequestException } from '../error/bad-request-error';
import { MainEntity } from '../main-classes/mainEntity';
import { OrderEntity } from '../orders/orders.entity';
import { StoreEntity } from '../store/store.entity';
import TokenEntity from '../token/token.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}
@Entity('user')
export class UserEntity extends MainEntity {
  @Column('text', { nullable: false })
  email: string;

  @Column('text', { nullable: false })
  password: string;

  @Column('text', { nullable: false, default: '+96178886897' })
  phoneNumber: string;

  @Column('text', { nullable: false })
  name: string;

  @OneToOne(() => TokenEntity, (profile) => profile.user) // specify inverse side as a second parameter
  @JoinColumn()
  token: TokenEntity;

  @Column('enum', { enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @OneToMany(() => StoreEntity, (store) => store.user)
  stores: StoreEntity;

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];

  @Column('int', { nullable: false, default: 0 })
  totalOrders: number;

  @Column('float', { nullable: false, default: 0 })
  totalSpent: number;

  @ManyToMany(() => StoreEntity, (store) => store.customers, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  customersFor: StoreEntity[];

  async comparePassword(oldPassword: string) {
    return await bcrypt.compare(oldPassword, this.password);
  }

  // constraints for user entity
  // only admins can have item categories

  @BeforeInsert()
  @BeforeUpdate()
  async checkStoreConstraint() {
    if (this.role !== UserRole.ADMIN && this.stores) {
      throw new BadRequestException('Only admins can have a store.');
    }
  }
}
