import { MainDto } from 'src/main-classes/main-dto';

export class CreatedItemDto extends MainDto {
  name: string;
  description: string;
  price: string;
  discount: string;
  images: string[];
  stock: string;
  rating: string;
  options: { name: string; options: string[] }[];
}
