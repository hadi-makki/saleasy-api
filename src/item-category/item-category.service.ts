import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemCategoryEntity } from './item-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemCategoryService {
  constructor(
    @InjectRepository(ItemCategoryEntity)
    private itemCategoryRepository: Repository<ItemCategoryEntity>,
  ) {}
  
}
