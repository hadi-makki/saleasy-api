import { ApiProperty } from '@nestjs/swagger';
import { MainDto } from './main-dto';

export class MainPaginatedDto extends MainDto {
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
    sortBy: [string, string][];
    search: string;
    filter: any;
  };
  links: {
    first: string;
    previous: string;
    current: string;
    next: string;
    last: string;
  };
}
