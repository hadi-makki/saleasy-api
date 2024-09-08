import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreEntity } from './store.entity';
import { Repository } from 'typeorm';
import { CreateStoreDto } from './dtos/req/create-store.dto';
import { MediaService } from 'src/media/media.service';
import { UserEntity } from 'src/user/user.entity';
import { Response } from 'express';
import { BadRequestException } from 'src/error/bad-request-error';
import { allDefault, LinkEntity } from 'src/link/link.entity';
import { CreatedStoreDto } from './dtos/res/created-store.dto';
import { CreatedLinkDto } from 'src/link/dtos/res/created-link.dto';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(StoreEntity)
    private storeRepository: Repository<StoreEntity>,
    @InjectRepository(LinkEntity)
    private linkRepository: Repository<LinkEntity>,
    private readonly mediaService: MediaService,
  ) {}

  async createStore(
    data: CreateStoreDto,
    logo: Express.Multer.File,
    user: UserEntity,
  ): Promise<CreatedStoreDto> {
    const uploadLogo = await this.mediaService.upload(logo, user.id);
    try {
      const createStore = this.storeRepository.create({
        name: data.name,
        description: data.description,
        logo: uploadLogo.id,
        user: {
          id: user.id,
        },
      });
      const createdStore = await this.storeRepository.save(createStore);
      if (createdStore) {
        const createLink = this.linkRepository.create({
          ...allDefault,
          store: createdStore, // Pass the actual store entity, not just the ID
        });
        await this.linkRepository.save(createLink).catch(async (error) => {
          await this.storeRepository.delete(createStore.id);
          throw new BadRequestException(error.message);
        });
        createStore.link = createLink;
        return createStore;
      }
    } catch (error) {
      await this.mediaService.delete(uploadLogo.id);
      throw new BadRequestException(error.message);
    }
  }

  async getStoreById(id: string) {
    const store = await this.storeRepository.findOne({
      where: { id },
      relations: {
        //   items: true,
        categories: true,
        //   subCategories: true,
        link: true,
        //   user: true,
      },
    });
    if (!store) {
      throw new BadRequestException('Store not found');
    }
    return store;
  }
}
