import * as bcrypt from 'bcryptjs';
import { BadRequestException } from 'src/error/bad-request-error';
import { MainEntity } from 'src/main-classes/mainEntity';
import { StoreEntity } from 'src/store/store.entity';
import TokenEntity from 'src/token/token.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
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
