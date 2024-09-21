import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity, OrderStatus } from './orders.entity';
import { CreateOrderDto } from './dtos/req/create-order.dto';
import { In, Repository } from 'typeorm';
import { ItemEntity } from 'src/item/item.entity';
import { UserEntity } from 'src/user/user.entity';
import { CreatedOrderDto } from './dtos/res/created-order.dto';
import { NotFoundException } from 'src/error/not-found-error';
import { SuccessMessageReturn } from 'src/main-classes/success-message-return';
import { StoreEntity } from 'src/store/store.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(ItemEntity)
    private readonly itemRepository: Repository<ItemEntity>,
    @InjectRepository(StoreEntity)
    private readonly storeRepository: Repository<StoreEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createOrder(
    data: CreateOrderDto,
    user: UserEntity,
  ): Promise<CreatedOrderDto> {
    const checkStore = await this.itemRepository.findOne({
      where: {
        store: {
          id: data.storeId,
        },
      },
    });
    if (!checkStore) {
      throw new NotFoundException('Store not found');
    }
    const itemIds = data.items.map((item) => item.id);
    if (itemIds.length === 0) {
      throw new NotFoundException('Items not found');
    }
    const orderOptions = data.items.map((item) => {
      return {
        options: item.options,
        item: item.id,
      };
    });
    const items = await this.itemRepository.find({
      where: {
        id: In(itemIds),
      },
    });

    const total = items.reduce((acc, item) => {
      const itemData = data.items.find((i) => i.id === item.id);
      return acc + item.price * itemData.quantity;
    }, 0);

    const createOrder = this.orderRepository.create({
      items: items,
      store: {
        id: data.storeId,
      },
      user,
      total: total,
      orderOptions,
      shippingInfo: data.shippingInfo,
    });
    const checkIsCustomer = await this.storeRepository.findOne({
      where: {
        customers: {
          id: user.id,
        },
      },
      relations: {
        customers: true,
      },
    });
    if (!checkIsCustomer) {
      this.handleCustomers(data.storeId, user);
    }

    return await this.orderRepository.save(createOrder);
  }

  async handleCustomers(storeId: string, user: UserEntity) {
    try {
      const store = await this.storeRepository.findOne({
        where: {
          id: storeId,
        },
        relations: {
          customers: true,
        },
      });
      if (!store.customers) {
        store.customers = [];
      }
      store.customers.push(user);
      await this.storeRepository.save(store);
      const userStore = await this.userRepository.findOne({
        where: {
          id: user.id,
        },
        relations: {
          stores: true,
        },
      });
      if (!userStore.customersFor) {
        userStore.customersFor = [];
      }
      userStore.customersFor.push(store);
      await this.userRepository.save(userStore);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getOrders(): Promise<CreatedOrderDto[]> {
    const orders = await this.orderRepository.find({
      relations: {
        store: true,
        items: true,
      },
    });
    return orders;
  }

  async deleteOrder(id: string): Promise<SuccessMessageReturn> {
    const order = await this.orderRepository.findOne({
      where: {
        id,
      },
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    await this.orderRepository.delete(id);
    return {
      message: 'Order deleted successfully',
    };
  }

  async updateOrderStatus(
    id: string,
    status: OrderStatus,
  ): Promise<CreatedOrderDto> {
    const order = await this.orderRepository.findOne({
      where: {
        id,
      },
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    order.status = status;
    return await this.orderRepository.save(order);
  }

  async getUserOrders(user: UserEntity): Promise<CreatedOrderDto[]> {
    const orders = await this.orderRepository.find({
      where: {},
      relations: {
        store: true,
        items: true,
      },
    });
    return orders;
  }
}
