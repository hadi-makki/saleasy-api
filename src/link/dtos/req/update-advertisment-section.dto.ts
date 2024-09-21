import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateAdvertismentSectionDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  @IsOptional()
  image: string;

  @ApiProperty({ type: 'string', format: 'string' })
  @IsString()
  text1: string;

  @ApiProperty({ type: 'string', format: 'string' })
  @IsString()
  text2: string;

  @ApiProperty({ type: 'string', format: 'string' })
  @IsString()
  redText: string;

  @ApiProperty({ type: 'string', format: 'string' })
  @IsString()
  linkTitle: string;

  @ApiProperty({ type: 'string', format: 'string' })
  @IsString()
  linkTarget: string;

  @ApiProperty({ type: 'string', format: 'string' })
  @IsString()
  imageId: string;
}
