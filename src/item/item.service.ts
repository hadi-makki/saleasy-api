import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemCategoryEntity } from 'src/item-category/item-category.entity';
import { ItemSubCategoryEntity } from 'src/item-sub-category/item-sub-category.entity';
import { StoreEntity } from 'src/store/store.entity';
import { UserEntity } from 'src/user/user.entity';
import {
  In,
  LessThanOrEqual,
  Like,
  MoreThan,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { ItemEntity } from './item.entity';
import { BadRequestException } from 'src/error/bad-request-error';
import { CreateItemDto } from './dtos/req/create-item.dto';
import { MediaService } from 'src/media/media.service';
import { sectionsTypes } from 'src/link/link.entity';
import { isUUID } from 'class-validator';
import {
  FilterOperator,
  FilterSuffix,
  Paginate,
  PaginateQuery,
  paginate,
  Paginated,
  PaginateConfig,
} from 'nestjs-paginate';
import { FilterPropertiesInterface } from 'src/main-classes/filter-properties.interface';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(ItemEntity)
    private itemRepository: Repository<ItemEntity>,
    @InjectRepository(ItemCategoryEntity)
    private itemCategoryRepository: Repository<ItemCategoryEntity>,
    @InjectRepository(ItemSubCategoryEntity)
    private itemSubCategoryRepository: Repository<ItemSubCategoryEntity>,
    @InjectRepository(StoreEntity)
    private storeRepository: Repository<StoreEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly mediaService: MediaService,
  ) {}

  async createItem({
    subCategory,
    store,
    name,
    description,
    price,
    images,
    stock,
  }: CreateItemDto) {
    const getStore = await this.storeRepository.findOne({
      where: { id: store },
    });
    if (!getStore) {
      throw new BadRequestException('Store not found');
    }
    const getSubCategory = await this.itemSubCategoryRepository.findOne({
      where: { id: subCategory },
      relations: {
        category: true,
      },
    });
    if (!getSubCategory) {
      throw new BadRequestException('Sub Category not found');
    }
    console.log(images);
    const createItem = this.itemRepository.create({
      name,
      description,
      price,
      images,
      stock,
      subCategory: getSubCategory,
      store: getStore,
      category: getSubCategory.category,
    });
    const newItem = await this.itemRepository.save(createItem);

    return newItem;
  }

  async getItemsByStoreId(storeId: string) {
    const getItems = await this.itemRepository.find({
      where: { store: { id: storeId } },
      relations: {
        subCategory: true,
      },
    });
    return getItems;
  }

  async getStoreDealsOfTheDayItems(storeId: string) {
    const getItems = await this.itemRepository.find({
      where: {
        store: { id: storeId },
      },
      order: {
        discount: 'DESC', // Highest discount first
        stock: 'ASC', // Lowest stock first
      },
      take: 10, // Take only the first 10 items after sorting
    });
    if (!getItems) {
      throw new BadRequestException('No items found');
    }
    return getItems;
  }

  async getManuallySelectedItemsSection(storeId: string) {
    const getStore = await this.storeRepository.findOne({
      where: { id: storeId },
      relations: {
        items: true,
        link: true,
      },
    });
    if (!getStore) {
      throw new BadRequestException('Store not found');
    }
    const getManuallySelectedItems = getStore.link.sections.find(
      (section) => section.type === sectionsTypes.manually_selected,
    );
    if (!getManuallySelectedItems) {
      throw new BadRequestException('No manually selected items found');
    }
    const filterIds = getManuallySelectedItems.items.map((item) => {
      if (isUUID(item)) {
        return item;
      }
    });
    const getItems = await this.itemRepository.find({
      where: {
        id: In(filterIds),
      },
    });
    return {
      sectionName: getManuallySelectedItems.title,
      sections: getManuallySelectedItems.advertisementSection,
      items: getItems,
    };
  }

  async getCategoryItemsSection(storeId: string) {
    const getStore = await this.storeRepository.findOne({
      where: { id: storeId },
      relations: {
        items: true,
        link: true,
      },
    });
    if (!getStore) {
      throw new BadRequestException('Store not found');
    }
    const getCategoryItems = getStore.link.sections.find(
      (section) => section.type === sectionsTypes.category_related,
    );
    if (!getCategoryItems) {
      throw new BadRequestException('No category items found');
    }
    const getCategory = await this.itemCategoryRepository.findOne({
      where: { id: getCategoryItems.categoryId },
      relations: {
        items: true,
        subCategories: true,
      },
    });

    return getCategory;
  }

  async getItemById(itemId: string) {
    const getItem = await this.itemRepository.findOne({
      where: { id: itemId },
      relations: {
        subCategory: true,
      },
    });
    if (!getItem) {
      throw new BadRequestException('Item not found');
    }
    return getItem;
  }

  async getItems({
    filters,
    page,
    limit,
    sorting,
  }: {
    filters: FilterPropertiesInterface;
    page: number;
    limit: number;
    sorting: [string, 'ASC' | 'DESC'][];
  }) {
    const query: PaginateQuery = {
      limit: limit,
      page: page,
      sortBy: sorting,
      path: 'users',
    };

    const filterableColumns: any = {
      name: [FilterOperator.EQ, FilterOperator.CONTAINS], // Filter by name
      age: true, // Assuming age is a filterable column
      // Add other columns here as needed
    };

    // Build the dynamic filters
    const filterQuery: any = {};

    Object.keys(filters).forEach((filterKey) => {
      if (filterableColumns[filterKey] && filters[filterKey]) {
        filterQuery[filterKey] = filters[filterKey];
      }
    });

    // Log the filter query to check its structure
    console.log('filterQuery:', filterQuery);
    const config: any = {
      sortableColumns: ['id', 'name', 'createdAt', 'price'],
      nullSort: 'last',
      defaultSortBy: [['createdAt', 'ASC']],
      searchableColumns: ['name'], // Make name searchable
      select: ['*'], // Select all columns
      filterableColumns,
    };

    if (Object.keys(filterQuery).length > 0) {
      config.where = filterQuery;
    }

    const paginateResult = await paginate(query, this.itemRepository, config);

    return paginateResult;
  }
}
