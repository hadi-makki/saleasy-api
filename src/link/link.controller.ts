import { Controller, Post } from '@nestjs/common';
import { LinkService } from './link.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreatedLinkDto } from './dtos/res/created-link.dto';

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
}
