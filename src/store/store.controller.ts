import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
} from '../error/api-responses.decorator';
import { AdminAuthGuard } from '../guards/admin.guard';
import { CreateStoreDto } from './dtos/req/create-store.dto';
import { StoreService } from './store.service';
import { User } from '../decorators/users.decorator';
import { UserEntity } from '../user/user.entity';
import { Response } from 'express';
import { CreatedStoreDto } from './dtos/res/created-store.dto';
import { ItemService } from '../item/item.service';
import { ILike } from 'typeorm';
@Controller('store')
@ApiTags('Store')
@ApiNotFoundResponse()
@ApiInternalServerErrorResponse()
@ApiBadRequestResponse()
export class StoreController {
  constructor(
    private readonly storeService: StoreService,
    private readonly itemService: ItemService,
  ) {}

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create a new store',
    type: CreateStoreDto,
  })
  @UseGuards(AdminAuthGuard)
  @UseInterceptors(FileInterceptor('logo'))
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: CreatedStoreDto,
  })
  async createStore(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
        fileIsRequired: true,
      }),
    )
    logo: Express.Multer.File,
    @Body() data: CreateStoreDto,
    @User() user: UserEntity,
  ) {
    return await this.storeService.createStore(data, logo, user);
  }
  @Get('/:id')
  async getStoreById(@Param('id') id: string) {
    return await this.storeService.getStoreById(id);
  }

  @Get('deals-of-the-day/:id')
  async getDealsOfTheDay(@Param('id') id: string) {
    return await this.itemService.getStoreDealsOfTheDayItems(id);
  }

  @Get('manually-selected-items-section/:id')
  async getManuallySelectedItemsSection(@Param('id') id: string) {
    return await this.itemService.getManuallySelectedItemsSection(id);
  }

  @Get('get-category-section-items/:id')
  async getCategorySectionItems(@Param('id') id: string) {
    return await this.itemService.getCategoryItemsSection(id);
  }

  @Get('items/:id')
  async getItemsByStoreId(@Param('id') id: string) {
    return await this.itemService.getItemsByStoreId(id);
  }

  @Get('store-customers/:id')
  @UseGuards(AdminAuthGuard)
  @ApiBearerAuth()
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'createdAt', required: false })
  @ApiQuery({ name: 'updatedAt', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'page', required: false })
  async getStoreCustomers(
    @Param('id') id: string,
    @Query('name') name?: string,
    @Query('createdAt') createdAt?: 'ASC' | 'DESC',
    @Query('updatedAt') updatedAt?: 'ASC' | 'DESC',
    @Query('limit') limit?: number,
    @Query('page') page?: number,
  ) {
    const sorting = [];
    if (createdAt) {
      sorting.push(['createdAt', createdAt]);
    }
    if (updatedAt) {
      sorting.push(['updatedAt', updatedAt]);
    }

    return await this.storeService.getCustomersByStoreId({
      storeId: id,
      page,
      limit,
      sorting,
      filters: {
        name: name ? ILike(`%${name}%`) : undefined,
      },
    });
  }
}
