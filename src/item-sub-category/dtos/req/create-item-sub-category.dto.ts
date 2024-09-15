import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class createItemSubCategoryDto {
  @ApiProperty()
  @IsString()
  name: string;

  // @ApiProperty()
  // @IsString()
  // description: string;

  @ApiProperty()
  @IsUUID()
  category: string;
}
