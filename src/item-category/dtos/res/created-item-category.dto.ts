import { ApiProperty } from '@nestjs/swagger';
import { MainDto } from '../../../main-classes/main-dto';

export class CreatedItemCategoryDto extends MainDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  image: string;
}
