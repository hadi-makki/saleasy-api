import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemCategoryEntity } from './item-category.entity';
import { Repository } from 'typeorm';
import { createItemCategoryDto } from './dtos/req/create-item-category.dto';
import { StoreEntity } from 'src/store/store.entity';
import { S3Service } from 'src/s3/s3.service';
import { MediaService } from 'src/media/media.service';
import { UserEntity } from 'src/user/user.entity';
import { CreatedItemCategoryDto } from './dtos/res/created-item-category.dto';
import { SuccessMessageReturn } from 'src/main-classes/success-message-return';

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
  ): Promise<CreatedItemCategoryDto> {
    const store = await this.storeRepository.findOne({
      where: { id: data.storeId },
    });
    if (!store) {
      throw new Error('Store not found');
    }
    const uploadedImage = await this.mediaService.upload(logo, user.id);
    const itemCategory = this.itemCategoryRepository.create({
      name: data.name,
      description: data.description,
      image: uploadedImage.id,
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

  async getItemCategory(): Promise<CreatedItemCategoryDto[]> {
    return this.itemCategoryRepository.find();
  }

  async getCategoriesByStoreId(
    storeId: string,
  ): Promise<CreatedItemCategoryDto[]> {
    const getCategories = await this.itemCategoryRepository.find({
      where: { store: { id: storeId } },
      relations: {
        subCategories: true,
      },
    });
    return getCategories;
  }

  async deleteCategory(categoryId: string): Promise<SuccessMessageReturn> {
    const category = await this.itemCategoryRepository.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      throw new BadRequestException('Category not found');
    }
    await this.mediaService.delete(category.image);
    await this.itemCategoryRepository.remove(category);
    return {
      message: 'Category deleted successfully',
    };
  }

  async updateCategoryName(
    categoryId: string,
    name: string,
  ): Promise<SuccessMessageReturn> {
    const category = await this.itemCategoryRepository.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      throw new BadRequestException('Category not found');
    }
    category.name = name;
    await this.itemCategoryRepository.save(category);
    return {
      message: 'Category name updated successfully',
    };
  }

  async getStoreCategories(storeId: string): Promise<CreatedItemCategoryDto[]> {
    const checkStore = await this.storeRepository.findOne({
      where: { id: storeId },
    });
    if (!checkStore) {
      throw new BadRequestException('Store not found');
    }
    return this.itemCategoryRepository.find({
      where: { store: { id: storeId } },
    });
  }

  async updateCategoryImage(
    categoryId: string,
    image: Express.Multer.File,
    user: UserEntity,
  ): Promise<SuccessMessageReturn> {
    const category = await this.itemCategoryRepository.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      throw new BadRequestException('Category not found');
    }
    const uploadedImage = await this.mediaService.upload(image, user.id);
    await this.mediaService.delete(category.image);
    category.image = uploadedImage.id;
    await this.itemCategoryRepository.save(category);
    return {
      message: 'Category image updated successfully',
    };
  }
}
