import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreEntity } from './store.entity';
import { In, Repository } from 'typeorm';
import { CreateStoreDto } from './dtos/req/create-store.dto';
import { MediaService } from 'src/media/media.service';
import { UserEntity } from 'src/user/user.entity';
import { Response } from 'express';
import { BadRequestException } from 'src/error/bad-request-error';
import { allDefault, LinkEntity } from 'src/link/link.entity';
import { CreatedStoreDto } from './dtos/res/created-store.dto';
import { CreatedLinkDto } from 'src/link/dtos/res/created-link.dto';
import { OrderEntity } from 'src/orders/orders.entity';
import { returnUser } from 'src/utils/helprt-functions';
import { FilterPropertiesInterface } from 'src/main-classes/filter-properties.interface';
import { FilterOperator, paginate, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(StoreEntity)
    private storeRepository: Repository<StoreEntity>,
    @InjectRepository(LinkEntity)
    private linkRepository: Repository<LinkEntity>,
    private readonly mediaService: MediaService,
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
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

  async getCustomersByStoreId({
    filters,
    page,
    limit,
    sorting,
    storeId,
  }: {
    filters: FilterPropertiesInterface;
    page: number;
    limit: number;
    sorting: [string, 'ASC' | 'DESC'][];
    storeId: string;
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
      price: [FilterOperator.GT, FilterOperator.LT], // Filter by price
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
    const config: any = {
      sortableColumns: ['id', 'name', 'createdAt'],
      nullSort: 'last',
      defaultSortBy: [['createdAt', 'ASC']],
      searchableColumns: ['name'], // Make name searchable
      select: ['*'], // Select all columns
      filterableColumns,
    };

    if (Object.keys(filterQuery).length > 0) {
      config.where = filterQuery;
    }

    const getCustomers = await this.storeRepository.findOne({
      where: { id: storeId },
      relations: {
        customers: true,
      },
      select: ['id'],
    });
    const customersIds = getCustomers.customers.map((customer) => {
      return customer.id;
    });
    config.where = {
      ...config.where,
      id: In(customersIds),
    };
    const paginateResult = await paginate(query, this.userRepository, config);

    return paginateResult;
  }
}
