import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LinkService } from './link.service';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreatedLinkDto } from './dtos/res/created-link.dto';
import { AdminAuthGuard } from 'src/guards/admin.guard';
import { HeaderDto } from './dtos/req/update-header.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatedItemCategoryDto } from 'src/item-category/dtos/res/created-item-category.dto';
import { createItemCategoryDto } from 'src/item-category/dtos/req/create-item-category.dto';
import { UserEntity } from 'src/user/user.entity';
import { User } from 'src/decorators/users.decorator';
import { AddCarouselItemDto } from './dtos/req/add-carousel-item';
import { EditCarouselItemDto } from './dtos/req/edit-carousel-item';
import { EditSideboxDto } from './dtos/req/edit-sidebox';
import { UpdateAdvertismentSectionDto } from './dtos/req/update-advertisment-section.dto';
import { CreateAddSectionDto } from './dtos/req/create-ad-section.dto';
import { UpdateSectionNameDto } from './dtos/req/update-section-name';
import { UpdateManualSelectedItemsDto } from './dtos/req/update-manual-selected-items.dto';

@Controller('link')
@ApiTags('Link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post('create')
  // @ApiBearerAuth()
  // @ApiCreatedResponse({
  //   description: 'The record has been successfully created.',
  //   type: CreatedLinkDto,
  // })
  async createLink() {
    return this.linkService.createLink();
  }

  @Patch('update-header/:storeId')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CreatedLinkDto,
  })
  @UseGuards(AdminAuthGuard)
  async updateHeader(
    @Body() header: HeaderDto,
    @Param('storeId') storeId: string,
  ) {
    return await this.linkService.updateHeader(storeId, header);
  }

  @Post('add-carousel-item/:linkId')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
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
    @Body() data: AddCarouselItemDto,
    @User() user: UserEntity,
    @Param('linkId') linkId: string,
  ) {
    return await this.linkService.addCarouseItem(image, linkId, data, user);
  }

  @Patch('update-carousel-item/:linkId')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CreatedItemCategoryDto,
  })
  async updateCarouselItem(
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
    @Body() data: EditCarouselItemDto,
    @User() user: UserEntity,
    @Param('linkId') linkId: string,
  ) {
    return await this.linkService.updateCarouselItem(image, linkId, data, user);
  }

  @Delete('delete-carousel-item/:linkId/:carouselItemId')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CreatedItemCategoryDto,
  })
  async deleteCarouselItem(
    @Param('linkId') linkId: string,
    @Param('carouselItemId') carouselItemId: string,
  ) {
    return await this.linkService.deleteCarouselItem(linkId, carouselItemId);
  }

  @Patch('update-sidebox-item/:linkId/:sideboxId')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @ApiBearerAuth()
  async updateSidebox(
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
    @Body() data: EditSideboxDto,
    @User() user: UserEntity,
    @Param('linkId') linkId: string,
    @Param('sideboxId') sideboxId: string,
  ) {
    return await this.linkService.updateSideBox(
      image,
      linkId,
      sideboxId,
      data,
      user,
    );
  }

  @Patch('update-advertisment-section/:linkId/:sectionId/:advertismentId')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @ApiBearerAuth()
  async updateAdvertismentSection(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
        fileIsRequired: false,
      }),
    )
    image: Express.Multer.File,
    @Body() data: UpdateAdvertismentSectionDto,
    @User() user: UserEntity,
    @Param('linkId') linkId: string,
    @Param('sectionId') sectionId: string,
    @Param('advertismentId') advertismentId: string,
  ) {
    return await this.linkService.updateAdvertisementSection(
      linkId,
      sectionId,
      advertismentId,
      data,
      image,
      user,
    );
  }

  @Delete('delete-advertisment-section/:linkId/:sectionId/:advertismentId')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CreatedItemCategoryDto,
  })
  async deleteAdvertismentSection(
    @Param('linkId') linkId: string,
    @Param('sectionId') sectionId: string,
    @Param('advertismentId') advertismentId: string,
  ) {
    return await this.linkService.deleteAdvertisementSection(
      linkId,
      sectionId,
      advertismentId,
    );
  }

  @Post('add-advertisment-section/:linkId/:sectionId')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CreatedItemCategoryDto,
  })
  async addAdvertismentSection(
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
    @Body() data: CreateAddSectionDto,
    @User() user: UserEntity,
    @Param('linkId') linkId: string,
    @Param('sectionId') sectionId: string,
  ) {
    return await this.linkService.addAdvertisementSection(
      linkId,
      sectionId,
      data,
      image,
      user,
    );
  }

  @Patch('update-section-name/:linkId/:sectionId')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CreatedItemCategoryDto,
  })
  async updateSectionName(
    @Body() { name }: UpdateSectionNameDto,
    @Param('linkId') linkId: string,
    @Param('sectionId') sectionId: string,
  ) {
    return await this.linkService.updateSectionName(linkId, sectionId, name);
  }

  @Patch('update-manually-selected-items/:linkId/:sectionId')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CreatedItemCategoryDto,
  })
  async updateManuallySelectedItems(
    @Body() { items }: UpdateManualSelectedItemsDto,
    @Param('linkId') linkId: string,
    @Param('sectionId') sectionId: string,
  ) {
    return await this.linkService.updateManuallySelectedItems(
      linkId,
      sectionId,
      items,
    );
  }

  @Delete('remove-manually-selected-item/:linkId/:sectionId/:itemId')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CreatedItemCategoryDto,
  })
  async removeManuallySelectedItems(
    @Param('linkId') linkId: string,
    @Param('sectionId') sectionId: string,
    @Param('itemId') itemId: string,
  ) {
    return await this.linkService.removeManuallySelectedItem(
      linkId,
      sectionId,
      itemId,
    );
  }

  @Patch('update-category-section/:linkId/:sectionId/:categoryId')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CreatedItemCategoryDto,
  })
  async updateCategorySection(
    @Param('linkId') linkId: string,
    @Param('sectionId') sectionId: string,
    @Param('categoryId') categoryId: string,
  ) {
    return await this.linkService.updateCategorySection(
      linkId,
      sectionId,
      categoryId,
    );
  }
}
