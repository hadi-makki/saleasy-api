import { ApiProperty } from '@nestjs/swagger';
import { CreatedItemDto } from '../../../item/dtos/res/created-item.dto';
import { MainDto } from '../../../main-classes/main-dto';
import { CreatedStoreDto } from '../../../store/dtos/res/created-store.dto';

class option {
  @ApiProperty()
  key: string;
  @ApiProperty()
  value: string;
}
class shippingInfo {
  @ApiProperty()
  name: string;
  @ApiProperty()
  country: string;
  @ApiProperty()
  company: string | null;
  @ApiProperty()
  address: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  method: 'ship' | 'pick';
}
class orderOptions {
  @ApiProperty({ type: [option] })
  options: option[];
  @ApiProperty()
  item: string;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  order: any;
}
export class CreatedOrderDto extends MainDto {
  @ApiProperty({ type: CreatedStoreDto })
  store: CreatedStoreDto;
  @ApiProperty({ type: [CreatedItemDto] })
  items: CreatedItemDto[];
  @ApiProperty({ type: [orderOptions] })
  orderOptions: orderOptions[];
  @ApiProperty({ type: shippingInfo })
  shippingInfo: shippingInfo;
  @ApiProperty()
  total: number;
}
