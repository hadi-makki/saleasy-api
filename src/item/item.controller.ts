import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('item')
@ApiTags('Item')
export class ItemController {}
