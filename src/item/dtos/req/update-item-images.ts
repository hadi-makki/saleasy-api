import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateItemImagesDto {
  @ApiProperty()
  @IsString({ each: true })
  images: string[];
}
