import { ApiProperty } from '@nestjs/swagger';
import { MainDto } from 'src/main-classes/main-dto';

export class CreatedItemDto extends MainDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  discount: number;
  @ApiProperty()
  images: string[];
  @ApiProperty()
  stock: number;
  @ApiProperty()
  options: { name: string; options: string[] }[];
}
