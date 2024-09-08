import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateItemDto {
  @ApiProperty()
  @IsString()
  subCategory: string;

  @ApiProperty()
  @IsString()
  store: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsString({ each: true })
  images: string[];

  @ApiProperty()
  @IsNumber()
  stock: number;
}
