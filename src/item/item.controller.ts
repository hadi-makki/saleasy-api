import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ItemService } from './item.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminAuthGuard } from 'src/guards/admin.guard';
import { CreateItemDto } from './dtos/req/create-item.dto';
import { FilterPropertiesInterface } from 'src/main-classes/filter-properties.interface';
import { Like } from 'typeorm';

@Controller('item')
@ApiTags('Item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post('create')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  async createItem(@Body() data: CreateItemDto) {
    return await this.itemService.createItem(data);
  }

  @Get('/:id')
  @ApiOkResponse({
    description: 'The record has been successfully created.',
  })
  async getItemCategoryById(@Param('id') id: string) {
    return await this.itemService.getItemById(id);
  }

  @Get()
  @ApiOkResponse({
    description: 'The record has been successfully created.',
  })
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'createdAt', required: false })
  @ApiQuery({ name: 'updatedAt', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'price', required: false })
  async getItems(
    @Query('name') name?: string,
    @Query('createdAt') createdAt?: 'ASC' | 'DESC',
    @Query('updatedAt') updatedAt?: 'ASC' | 'DESC',
    @Query('limit') limit?: number,
    @Query('page') page?: number,
    @Query('price') price?: 'ASC' | 'DESC',
  ) {
    const sorting = [];
    if (createdAt) {
      sorting.push(['createdAt', createdAt]);
    }
    if (updatedAt) {
      sorting.push(['updatedAt', updatedAt]);
    }
    if (price) {
      sorting.push(['price', price]);
    }

    return await this.itemService.getItems({
      filters: {
        name: name ? Like(`%${name}%`) : undefined,
      },
      page,
      limit,
      sorting,
    });
  }
}
