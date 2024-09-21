import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AddCarouselItemDto {
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
  text4: string;

  @ApiProperty({ type: 'string', format: 'string' })
  @IsString()
  buttonTitle: string;

  @ApiProperty({ type: 'string', format: 'string' })
  @IsString()
  buttonTarget: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @IsOptional()
  image: string;
}
