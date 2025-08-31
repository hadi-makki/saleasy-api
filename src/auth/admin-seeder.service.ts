import { OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { slugify } from 'src/utils/helprt-functions';
import { UserEntity, UserRole } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { StoreEntity } from 'src/store/store.entity';

export class AdminSeederService implements OnModuleInit {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(StoreEntity)
    private readonly storeRepository: Repository<StoreEntity>,
  ) {}

  async onModuleInit() {
    const email = 'admin@admin.com';
    const password = 'Password1$';
    const hashPassword = await bcrypt.hash(password, 10);
    const admin = await this.userRepository.findOne({ where: { email } });
    if (!admin) {
      console.log('Admin not found, creating admin');
      await this.userRepository.save({
        email,
        password: hashPassword,
        name: 'Saleasy Admin',
        phoneNumber: '+96178886897',
        countryCode: 'LB',
        role: UserRole.ADMIN,
      });
    }

    // fix stores slugs
    // const stores = await this.storeRepository.find();
    // for (const store of stores) {
    //   store.dashedName = slugify(store.name);
    //   await this.storeRepository.save(store);
    // }
  }
}
