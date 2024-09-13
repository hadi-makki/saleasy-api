import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsInt,
  IsEnum,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class OrderOption {
  @ApiProperty()
  @IsString()
  key: string;

  @ApiProperty()
  @IsString()
  value: string;
}

export class ShippingInfo {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  country: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  company: string | null;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsEnum(['ship', 'pick'])
  method: 'ship' | 'pick';
}

export class Item {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsInt()
  quantity: number;

  @ApiProperty({ type: [OrderOption] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderOption)
  options: OrderOption[];
}

export class CreateOrderDto {
  @ApiProperty()
  @IsString()
  storeId: string;

  @ApiProperty({ type: [Item] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Item)
  items: Item[];

  @ApiProperty({ type: ShippingInfo })
  @ValidateNested()
  @Type(() => ShippingInfo)
  shippingInfo: ShippingInfo;
}
