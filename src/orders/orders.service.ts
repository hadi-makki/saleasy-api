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
import { OrderOptionsEntity } from './order-options.entity';

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
    @InjectRepository(OrderOptionsEntity)
    private readonly orderOptionsRepository: Repository<OrderOptionsEntity>,
  ) {}

  async createOrder(data: CreateOrderDto, user: UserEntity) {
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
        quantity: item.quantity,
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

    const createOrderOptions = orderOptions.map((option) => {
      const orderOption = this.orderOptionsRepository.create({
        options: option.options,
        item: {
          id: option.item,
        },
        quantity: option.quantity,
      });
      return orderOption;
    });

    const createOrder = this.orderRepository.create({
      items: items,
      store: {
        id: data.storeId,
      },
      user,
      total: total,
      orderOptions: createOrderOptions,
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

  async getOrders() {
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

  async updateOrderStatus(id: string, status: OrderStatus, user: UserEntity) {
    const checkIfOrderIsFromStore = await this.orderRepository.findOne({
      where: {
        id,
        store: {
          user: {
            id: user.id,
          },
        },
      },
    });
    if (!checkIfOrderIsFromStore) {
      throw new NotFoundException('Order not found');
    }

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

  async getUserOrders(user: UserEntity) {
    const orders = await this.orderRepository.find({
      where: {},
      relations: {
        store: true,
        items: true,
      },
    });
    return orders;
  }

  async getStoreOrders(
    id: string,
    user: UserEntity,
    { status }: { status: OrderStatus },
  ) {
    const checkIfStoreValid = await this.storeRepository.findOne({
      where: {
        id,
        user: {
          id: user.id,
        },
      },
    });

    if (!checkIfStoreValid) {
      throw new NotFoundException('Store not found');
    }
    const orders = await this.orderRepository.find({
      where: {
        store: {
          id,
        },
        ...(status && { status }),
      },
      relations: {
        orderOptions: {
          item: true,
        },
        user: true,
      },
      select: {
        id: true,
        total: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        orderOptions: {
          id: true,
          options: true,
          quantity: true,
          item: {
            id: true,
            name: true,
            price: true,
            description: true,
          },
        },
        user: {
          id: true,
          email: true,
          name: true,
        },
      },
    });

    return orders.map((order) => {
      return {
        ...order,
        userName: order.user.name,
        userEmail: order.user.email,
        userId: order.user.id,
      };
    });
  }

  async updateOrdersTotalByItemId(itemId: string) {
    const getOrders = await this.orderRepository.find({
      where: {
        items: {
          id: itemId,
        },
      },
      relations: {
        items: true,
      },
    });

    getOrders.forEach((order) => {
      const total = order.items
        .map((item) => {
          return item.price;
        })
        .reduce((acc, price) => {
          return acc + price;
        });
      order.total = total;
      console.log('order', order);
      this.orderRepository.save(order);
    });

    return {
      message: 'Orders updated successfully',
    };
  }

  async getOrder(id: string, user: UserEntity) {
    const checkifOrderIsFromStore = await this.orderRepository.findOne({
      where: {
        id,
        store: {
          user: {
            id: user.id,
          },
        },
      },
    });
    if (!checkifOrderIsFromStore) {
      throw new NotFoundException('Order not found');
    }
    const order = await this.orderRepository.findOne({
      where: {
        id,
      },
      relations: {
        orderOptions: {
          item: true,
        },
      },
      select: {
        id: true,
        status: true,
        createdAt: true,
        total: true,
        shippingInfo: {
          name: true,
          country: true,
          company: true,
          address: true,
          city: true,
          method: true,
        },
        orderOptions: {
          id: true,
          options: true,
          quantity: true,
          item: {
            images: true,
            id: true,
            name: true,
            price: true,
            description: true,
          },
        },
      },
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }
}
