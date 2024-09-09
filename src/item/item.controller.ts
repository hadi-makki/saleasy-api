import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ItemService } from './item.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminAuthGuard } from 'src/guards/admin.guard';
import { CreateItemDto } from './dtos/req/create-item.dto';

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
}
