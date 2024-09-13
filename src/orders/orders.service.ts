import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './orders.entity';
import { CreateOrderDto } from './dtos/req/create-order.dto';
import { In, Repository } from 'typeorm';
import { ItemEntity } from 'src/item/item.entity';
import { UserEntity } from 'src/user/user.entity';
import { CreatedOrderDto } from './dtos/res/created-order.dto';
import { NotFoundException } from 'src/error/not-found-error';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(ItemEntity)
    private readonly itemRepository: Repository<ItemEntity>,
  ) {}

  async createOrder(data: CreateOrderDto): Promise<CreatedOrderDto> {
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

  async getOrders() {
    const orders = await this.orderRepository.find({
      relations: {
        store: true,
        items: true,
      },
    });
    console.log(orders);
    return orders;
  }
}
