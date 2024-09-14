import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class Options {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString({ each: true })
  options: string[];
}
export class UpdateItemDto {
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

  @ApiProperty({ type: [Options] })
  @IsArray()
  options: Options[];
}
