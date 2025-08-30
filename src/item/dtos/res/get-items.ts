import { MainPaginatedDto } from '../../../main-classes/main-paginated-dto';
import { CreatedItemDto } from './created-item.dto';

export class GetItemsDto extends MainPaginatedDto {
  items: CreatedItemDto[];
}
