import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
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
import { UpdateOrderStatus } from './dtos/req/update-order-status';
import { AdminAuthGuard } from 'src/guards/admin.guard';

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
    return this.ordersService.createOrder(data, user);
  }

  @Post('get')
  @UseGuards(AdminAuthGuard)
  @ApiCreatedResponse({
    type: [CreatedOrderDto],
  })
  async getOrders() {
    return this.ordersService.getOrders();
  }

  @Get('user-orders')
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    type: [CreatedOrderDto],
  })
  async getUserOrders(@User() user: UserEntity) {
    return this.ordersService.getUserOrders(user);
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    type: CreatedOrderDto,
  })
  async deleteOrder(@Param('id') id: string) {
    return this.ordersService.deleteOrder(id);
  }

  @Patch('update-status/:id')
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    type: CreatedOrderDto,
  })
  async updateOrderStatus(
    @Param('id') id: string,
    @Body() { status }: UpdateOrderStatus,
  ) {
    return this.ordersService.updateOrderStatus(id, status);
  }
}
