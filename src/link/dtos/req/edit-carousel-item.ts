import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class EditCarouselItemDto {
  @ApiProperty({ type: 'string', format: 'string' })
  @IsString()
  @IsOptional()
  text1: string;

  @ApiProperty({ type: 'string', format: 'string' })
  @IsString()
  @IsOptional()
  text2: string;

  @ApiProperty({ type: 'string', format: 'string' })
  @IsString()
  @IsOptional()
  text3: string;

  @ApiProperty({ type: 'string', format: 'string' })
  @IsString()
  @IsOptional()
  text4: string;

  @ApiProperty({ type: 'string', format: 'string' })
  @IsString()
  @IsOptional()
  buttonTitle: string;

  @ApiProperty({ type: 'string', format: 'string' })
  @IsString()
  @IsOptional()
  buttonTarget: string;

  @ApiProperty({ type: 'string', format: 'string' })
  @IsString()
  imageId: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @IsOptional()
  image: string;

  @ApiProperty({ type: 'string', format: 'string' })
  @IsString()
  itemId: string;
}
