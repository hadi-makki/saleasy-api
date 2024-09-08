import { ApiProperty } from '@nestjs/swagger';
import { CreatedLinkDto } from 'src/link/dtos/res/created-link.dto';
import { MainDto } from 'src/main-classes/main-dto';

export class CreatedStoreDto extends MainDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  logo: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ type: CreatedLinkDto })
  link: CreatedLinkDto;
}
