import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class UpdateManualSelectedItemsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  items: string[];
}
