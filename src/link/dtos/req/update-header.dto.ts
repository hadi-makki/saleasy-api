import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class linksDto {
  @ApiProperty()
  @IsString()
  instagram: string;

  @ApiProperty()
  @IsString()
  facebook: string;

  @ApiProperty()
  @IsString()
  twitter: string;
}

export class HeaderDto {
  @ApiProperty()
  @IsString()
  logo: string;

  @ApiProperty()
  @IsNumber()
  logoSize: number;

  @ApiProperty()
  @IsString()
  shippingFee: string;

  @ApiProperty({ type: linksDto })
  @IsNotEmpty()
  links: linksDto;

  @ApiProperty()
  @IsBoolean()
  isNewUploaded: boolean;
}
