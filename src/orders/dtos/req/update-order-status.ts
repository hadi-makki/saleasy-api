import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { OrderStatus } from 'src/orders/orders.entity';

export class UpdateOrderStatus {
  @ApiProperty()
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
