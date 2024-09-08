import { ApiProperty } from '@nestjs/swagger';
import { CreatedItemCategoryDto } from 'src/item-category/dtos/res/created-item-category.dto';
import { MainDto } from 'src/main-classes/main-dto';
import { CreatedStoreDto } from 'src/store/dtos/res/created-store.dto';

export class CreatedItemSubCategoryDto extends MainDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: CreatedItemCategoryDto })
  category: CreatedItemCategoryDto;

  @ApiProperty({ type: CreatedStoreDto })
  store: CreatedStoreDto;
}
