import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { allDefault, LinkEntity } from './link.entity';
import { Repository } from 'typeorm';
import { StoreEntity } from 'src/store/store.entity';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(LinkEntity)
    private linkRepository: Repository<LinkEntity>,
    @InjectRepository(StoreEntity)
    private storeRepository: Repository<StoreEntity>,
  ) {}
  async createLink() {
    const getStore = await this.storeRepository.findOne({
      where: { id: 'aecca3e4-23c4-4c1e-92ff-d9dabb1517df' },
    });
    const link = this.linkRepository.create({
      ...allDefault,
      store: getStore,
    });
    const newLink = await this.linkRepository.save(link);
    return newLink;
  }
}
