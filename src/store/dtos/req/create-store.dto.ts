import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateStoreDto {
  @ApiProperty({ type: 'string', format: 'string' })
  @IsString()
  name: string;

  @ApiProperty({ type: 'string', format: 'string' })
  @IsString()
  description: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  logo: string;
}
