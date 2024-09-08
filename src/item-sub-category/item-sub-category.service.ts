import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemSubCategoryService {
  constructor() {}

  async createItemSubCategory() {
    return 'Create Item Sub Category';
  }
}
