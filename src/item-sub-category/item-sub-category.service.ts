import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemSubCategoryEntity } from './item-sub-category.entity';
import { Repository } from 'typeorm';
import { ItemCategoryEntity } from 'src/item-category/item-category.entity';
import { createItemSubCategoryDto } from './dtos/req/create-item-sub-category.dto';
import { CreatedItemSubCategoryDto } from './dtos/res/created-item-sub-category.dto';
import { UserEntity } from 'src/user/user.entity';
import { BadRequestException } from 'src/error/bad-request-error';

@Injectable()
export class ItemSubCategoryService {
  constructor(
    @InjectRepository(ItemSubCategoryEntity)
    private itemSubCategoryRepository: Repository<ItemSubCategoryEntity>,
    @InjectRepository(ItemCategoryEntity)
    private itemCategoryRepository: Repository<ItemCategoryEntity>,
  ) {}

  async createItemSubCategory(
    data: createItemSubCategoryDto,
  ): Promise<CreatedItemSubCategoryDto> {
    const checkItemCategory = await this.itemCategoryRepository.findOne({
      where: { id: data.category },
      relations: {
        store: true,
      },
    });
    if (!checkItemCategory) {
      throw new BadRequestException('Item Category not found');
    }
    const itemSubCategory = this.itemSubCategoryRepository.create({
      name: data.name,
      description: data.description,
      category: checkItemCategory,
      store: checkItemCategory.store,
    });
    const newItemSubCategory =
      await this.itemSubCategoryRepository.save(itemSubCategory);

    return newItemSubCategory;
  }

  async getItemSubCategoryByStoreId(storeId: string) {
    const itemSubCategory = await this.itemSubCategoryRepository.find({
      where: {
        store: {
          id: storeId,
        },
      },
    });
    return itemSubCategory;
  }
}
