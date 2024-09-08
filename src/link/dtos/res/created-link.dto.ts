import { ApiProperty } from '@nestjs/swagger';
import { MainDto } from 'src/main-classes/main-dto';
import { CreatedStoreDto } from 'src/store/dtos/res/created-store.dto';

export class LinkDto {
  @ApiProperty({ example: 'Instagram', description: 'Link title' })
  title: string;

  @ApiProperty({ example: '_blank', description: 'Link target' })
  target: string;
}

export class HeaderDto {
  @ApiProperty({
    example: {
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
    },
    description: 'Social media links',
  })
  links: {
    instagram: string;
    facebook: string;
    twitter: string;
  };

  @ApiProperty({
    example: 'https://example.com/logo.png',
    description: 'Logo URL',
  })
  logo: string;

  @ApiProperty({ example: '10.00', description: 'Shipping fee' })
  shippingFee: string;
}

export class HeroCarouselDto {
  @ApiProperty({ example: 'Hero text 1', description: 'First text' })
  text1: string;

  @ApiProperty({ example: 'Hero text 2', description: 'Second text' })
  text2: string;

  @ApiProperty({ example: 'Hero text 3', description: 'Third text' })
  text3: string;

  @ApiProperty({ example: 'Hero text 4', description: 'Fourth text' })
  text4: string;

  @ApiProperty({
    example: 'https://example.com/background.jpg',
    description: 'Background image URL',
  })
  backgroundImage: string;

  @ApiProperty({ type: LinkDto, description: 'Link for the carousel item' })
  link: LinkDto;
}

export class HeroSideBoxDto {
  @ApiProperty({
    example: 'https://example.com/sidebox-bg.jpg',
    description: 'Background image for side box',
  })
  backgroundImage: string;

  @ApiProperty({ example: 'Side box text 1', description: 'First text' })
  text1: string;

  @ApiProperty({ example: 'Side box text 2', description: 'Second text' })
  text2: string;

  @ApiProperty({ example: 'Side box text 3', description: 'Third text' })
  text3: string;

  @ApiProperty({ type: LinkDto, description: 'Link for the side box' })
  link: LinkDto;
}

export class HeroDto {
  @ApiProperty({ type: [HeroCarouselDto], description: 'Hero carousel items' })
  Carousel: HeroCarouselDto[];

  @ApiProperty({ type: [HeroSideBoxDto], description: 'Hero side boxes' })
  sideBoxes: HeroSideBoxDto[];
}

export class AdvertisementSectionDto {
  @ApiProperty({ example: 'Advertisement text 1', description: 'First text' })
  text1: string;

  @ApiProperty({ example: 'Advertisement text 2', description: 'Second text' })
  text2: string;

  @ApiProperty({
    example: 'Advertisement red text',
    description: 'Highlighted text',
  })
  redText: string;

  @ApiProperty({
    type: LinkDto,
    description: 'Link for the advertisement section',
  })
  link: LinkDto;
}

export class SectionDto {
  @ApiProperty({ example: 'Section Title', description: 'Section title' })
  title: string;

  @ApiProperty({ example: 'categoryId123', description: 'Category ID' })
  categoryId: string;

  @ApiProperty({
    enum: ['sectionType1', 'sectionType2'],
    description: 'Section type',
  })
  type: string;

  @ApiProperty({
    type: [AdvertisementSectionDto],
    description: 'Advertisement section items',
  })
  advertisementSection: AdvertisementSectionDto[];
}

export class FooterDto {
  @ApiProperty({
    example: 'Footer description text',
    description: 'Description text for footer',
  })
  descriptionText: string;
}

export class CreatedLinkDto extends MainDto {
  @ApiProperty({ type: HeaderDto, description: 'Header details' })
  header: HeaderDto;

  @ApiProperty({ type: HeroDto, description: 'Hero section details' })
  Hero: HeroDto;

  @ApiProperty({
    example: ['category1', 'category2'],
    description: 'List of category items',
  })
  categoryItems: string[];

  @ApiProperty({ type: [SectionDto], description: 'Section details' })
  sections: SectionDto[];

  @ApiProperty({ type: FooterDto, description: 'Footer details' })
  footer: FooterDto;
}
