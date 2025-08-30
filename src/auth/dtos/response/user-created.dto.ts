import { ApiProperty } from '@nestjs/swagger';
import { MainDto } from '../../../main-classes/main-dto';

export class UserCreatedDto extends MainDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  isDeactivated: boolean;

  @ApiProperty()
  token: string;

  @ApiProperty()
  totalOrders: number;

  @ApiProperty()
  totalSpent: number;
}
