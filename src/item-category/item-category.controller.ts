import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ItemCategoryService } from './item-category.service';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '../error/api-responses.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { createItemCategoryDto } from './dtos/req/create-item-category.dto';
import { User } from '../decorators/users.decorator';
import { UserEntity } from '../user/user.entity';
import { CreatedItemCategoryDto } from './dtos/res/created-item-category.dto';
import { AdminAuthGuard } from '../guards/admin.guard';

@Controller('item-category')
@ApiTags('Item Category')
@ApiInternalServerErrorResponse()
@ApiUnauthorizedResponse()
@ApiBadRequestResponse()
export class ItemCategoryController {
  constructor(private readonly itemCategory: ItemCategoryService) {}

  @Post('create')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CreatedItemCategoryDto,
  })
  async createItemCategory(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
        fileIsRequired: true,
      }),
    )
    image: Express.Multer.File,
    @Body() data: createItemCategoryDto,
    @User() user: UserEntity,
  ) {
    return this.itemCategory.createItemCategory(data, image, user);
  }
  @Get('get-categories-by-store-id/:storeId')
  @ApiOkResponse({
    description: 'The record has been successfully created.',
    type: CreatedItemCategoryDto,
  })
  async getItemCategory(@Param('storeId') storeId: string) {
    return this.itemCategory.getCategoriesByStoreId(storeId);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiOkResponse({
    description: 'The record has been successfully deleted.',
  })
  async deleteCategory(@Param('id') id: string) {
    return this.itemCategory.deleteCategory(id);
  }

  @Patch('update-name/:id')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
  })
  async updateCategoryName(
    @Param('id') id: string,
    @Body('name') name: string,
  ) {
    return this.itemCategory.updateCategoryName(id, name);
  }

  @Patch('update-category-image/:id')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @ApiOkResponse({
    description: 'The record has been successfully updated.',
  })
  async updateCategoryImage(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
        fileIsRequired: true,
      }),
    )
    image: Express.Multer.File,
    @User() user: UserEntity,
  ) {
    return this.itemCategory.updateCategoryImage(id, image, user);
  }

  @Get()
  @ApiOkResponse({
    description: 'The record has been successfully fetched.',
  })
  async getCategories() {
    return this.itemCategory.getItemCategory();
  }

  @Get('store/:id')
  @ApiOkResponse({
    description: 'The record has been successfully fetched.',
  })
  async getCategory(@Param('id') id: string) {
    return this.itemCategory.getStoreCategories(id);
  }
}
