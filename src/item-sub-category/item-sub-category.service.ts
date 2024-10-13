import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from 'src/error/bad-request-error';
import { ItemCategoryEntity } from 'src/item-category/item-category.entity';
import { ItemService } from 'src/item/item.service';
import { SuccessMessageReturn } from 'src/main-classes/success-message-return';
import { Repository } from 'typeorm';
import { createItemSubCategoryDto } from './dtos/req/create-item-sub-category.dto';
import { EditSubCategoryDto } from './dtos/req/edit-sub-category.dto';
import { CreatedItemSubCategoryDto } from './dtos/res/created-item-sub-category.dto';
import { ItemSubCategoryEntity } from './item-sub-category.entity';

@Injectable()
export class ItemSubCategoryService {
  constructor(
    @InjectRepository(ItemSubCategoryEntity)
    private itemSubCategoryRepository: Repository<ItemSubCategoryEntity>,
    @InjectRepository(ItemCategoryEntity)
    private itemCategoryRepository: Repository<ItemCategoryEntity>,
    private readonly itemService: ItemService,
  ) {}

  async createItemSubCategory(data: createItemSubCategoryDto) {
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

  async deleteSubCategory(
    subCategoryId: string,
  ): Promise<SuccessMessageReturn> {
    const itemSubCategory = await this.itemSubCategoryRepository.findOne({
      where: {
        id: subCategoryId,
      },
      relations: {
        items: true,
      },
    });
    if (!itemSubCategory) {
      throw new BadRequestException('Item Sub Category not found');
    }
    if (itemSubCategory.items.length > 0) {
      await this.itemService.deleteItems(itemSubCategory.items);
    }
    await this.itemSubCategoryRepository.delete({ id: subCategoryId });
    return { message: 'Item Sub Category deleted successfully' };
  }

  async editItemSubCategory(subCategoryId: string, data: EditSubCategoryDto) {
    const itemSubCategory = await this.itemSubCategoryRepository.findOne({
      where: {
        id: subCategoryId,
      },
    });
    if (!itemSubCategory) {
      throw new BadRequestException('Item Sub Category not found');
    }
    itemSubCategory.name = data.name;
    const newItemSubCategory =
      await this.itemSubCategoryRepository.save(itemSubCategory);
    return newItemSubCategory;
  }
}
