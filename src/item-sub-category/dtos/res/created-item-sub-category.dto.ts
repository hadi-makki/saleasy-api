import { ApiProperty } from '@nestjs/swagger';
import { CreatedItemCategoryDto } from '../../../item-category/dtos/res/created-item-category.dto';
import { MainDto } from '../../../main-classes/main-dto';
import { CreatedStoreDto } from '../../../store/dtos/res/created-store.dto';

export class CreatedItemSubCategoryDto extends MainDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ type: CreatedItemCategoryDto })
  category: CreatedItemCategoryDto;

  @ApiProperty({ type: CreatedStoreDto })
  store: CreatedStoreDto;
}
