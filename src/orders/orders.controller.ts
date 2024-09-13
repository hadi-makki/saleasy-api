import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from 'src/error/api-responses.decorator';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dtos/req/create-order.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/users.decorator';
import { UserEntity } from 'src/user/user.entity';
import { CreatedOrderDto } from './dtos/res/created-order.dto';

@Controller('orders')
@ApiTags('orders')
@ApiInternalServerErrorResponse()
@ApiUnauthorizedResponse()
@ApiBearerAuth()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    type: CreatedOrderDto,
  })
  async createOrder(@Body() data: CreateOrderDto, @User() user: UserEntity) {
    return this.ordersService.createOrder(data);
  }

  @Post('get')
  @UseGuards(AuthGuard)
  async getOrders() {
    return this.ordersService.getOrders();
  }
}
