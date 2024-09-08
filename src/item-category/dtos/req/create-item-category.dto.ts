import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class createItemCategoryDto {
  @ApiProperty({ type: 'string', format: 'string' })
  @IsString()
  name: string;

  @ApiProperty({ type: 'string', format: 'string' })
  @IsString()
  description: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  image: string;

  @ApiProperty({ type: 'string', format: 'string' })
  @IsUUID()
  storeId: string;
}
