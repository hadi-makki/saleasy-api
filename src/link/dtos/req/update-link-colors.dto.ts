import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateLinkColorsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  primary: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  error: string;
}
