import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ItemSubCategoryService } from './item-sub-category.service';
import { AuthGuard } from 'src/guards/auth.guard';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from 'src/error/api-responses.decorator';
import { CreatedItemSubCategoryDto } from './dtos/res/created-item-sub-category.dto';
import { createItemSubCategoryDto } from './dtos/req/create-item-sub-category.dto';
import { User } from 'src/decorators/users.decorator';
import { UserEntity } from 'src/user/user.entity';

@Controller('item-sub-category')
@ApiTags('Item Sub Category')
@ApiInternalServerErrorResponse()
@ApiNotFoundResponse()
@ApiBadRequestResponse()
@ApiUnauthorizedResponse()
export class ItemSubCategoryController {
  constructor(
    private readonly itemSubCategoryService: ItemSubCategoryService,
  ) {}

  @Post('create')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CreatedItemSubCategoryDto,
  })
  async createItemSubCategory(@Body() data: createItemSubCategoryDto) {
    return this.itemSubCategoryService.createItemSubCategory(data);
  }

  @Get('store/:id')
  async getItemSubCategoryByStoreId(@Param('id') storeId: string) {
    return this.itemSubCategoryService.getItemSubCategoryByStoreId(storeId);
  }
}
