import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ItemCategoryService } from './item-category.service';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from 'src/error/api-responses.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { createItemCategoryDto } from './dtos/req/create-item-category.dto';
import { User } from 'src/decorators/users.decorator';
import { UserEntity } from 'src/user/user.entity';

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
}
