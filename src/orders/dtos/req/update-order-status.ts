import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { OrderStatus } from '../../../orders/orders.entity';

export class UpdateOrderStatus {
  @ApiProperty()
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
