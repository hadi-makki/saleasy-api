import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity, OrderStatus } from './orders.entity';
import { CreateOrderDto } from './dtos/req/create-order.dto';
import { In, Repository } from 'typeorm';
import { ItemEntity } from 'src/item/item.entity';
import { UserEntity } from 'src/user/user.entity';
import { CreatedOrderDto } from './dtos/res/created-order.dto';
import { NotFoundException } from 'src/error/not-found-error';
import { SuccessMessageReturn } from 'src/main-classes/success-message-return';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(ItemEntity)
    private readonly itemRepository: Repository<ItemEntity>,
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
      console.log(acc);
      const itemData = data.items.find((i) => i.id === item.id);
      return acc + item.price * itemData.quantity;
    }, 0);

    const createOrder = this.orderRepository.create({
      items: items,
      store: {
        id: data.storeId,
      },

      total: total,
      orderOptions,
      shippingInfo: data.shippingInfo,
    });

    return await this.orderRepository.save(createOrder);
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
