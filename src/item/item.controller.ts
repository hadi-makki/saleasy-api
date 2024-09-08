import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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
}
