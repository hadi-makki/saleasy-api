import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class EditSideboxDto {
  @ApiProperty({ type: 'string', format: 'string' })
  @IsString()
  text1: string;

  @ApiProperty({ type: 'string', format: 'string' })
  @IsString()
  text2: string;

  @ApiProperty({ type: 'string', format: 'string' })
  @IsString()
  text3: string;

  @ApiProperty({ type: 'string', format: 'string' })
  @IsString()
  linkText: string;

  @ApiProperty({ type: 'string', format: 'string' })
  @IsString()
  linkTarget: string;

  @ApiProperty({ type: 'string', format: 'string' })
  @IsString()
  imageId: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @IsOptional()
  image: string;
}
