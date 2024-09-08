import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemCategoryEntity } from './item-category.entity';
import { Repository } from 'typeorm';
import { createItemCategoryDto } from './dtos/req/create-item-category.dto';
import { StoreEntity } from 'src/store/store.entity';
import { S3Service } from 'src/s3/s3.service';
import { MediaService } from 'src/media/media.service';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class ItemCategoryService {
  constructor(
    @InjectRepository(ItemCategoryEntity)
    private itemCategoryRepository: Repository<ItemCategoryEntity>,
    @InjectRepository(StoreEntity)
    private storeRepository: Repository<StoreEntity>,
    private readonly mediaService: MediaService,
  ) {}

  async createItemCategory(
    data: createItemCategoryDto,
    logo: Express.Multer.File,
    user: UserEntity,
  ) {
    const store = await this.storeRepository.findOne({
      where: { id: data.storeId },
    });
    if (!store) {
      throw new Error('Store not found');
    }
    const uploadedImage = await this.mediaService.upload(logo, user.id);
    const itemCategory = this.itemCategoryRepository.create({
      name: data.name,
      store,
    });
    const newItemCategory = await this.itemCategoryRepository
      .save(itemCategory)
      .catch((err) => {
        this.mediaService.delete(uploadedImage.id);
        throw new BadRequestException(err);
      });
    return newItemCategory;
  }
}
