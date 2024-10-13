import { Module } from '@nestjs/common';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkEntity } from './entities/link.entity';
import { StoreEntity } from 'src/store/store.entity';
import { UserEntity } from 'src/user/user.entity';
import TokenEntity from 'src/token/token.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenService } from 'src/token/token.service';
import { MediaService } from 'src/media/media.service';
import { MediaEntity } from 'src/media/media.entity';
import { S3Service } from 'src/s3/s3.service';
import { ItemService } from 'src/item/item.service';
import { ItemEntity } from 'src/item/item.entity';
import { ItemCategoryEntity } from 'src/item-category/item-category.entity';
import { ItemSubCategoryEntity } from 'src/item-sub-category/item-sub-category.entity';
import { AdvertisementSectionEntity } from './entities/advertisment-section.entity';
import { CarouselEntity } from './entities/carousel.entity';
import { FooterEntity } from './entities/footer.entity';
import { HeaderEntity } from './entities/header.entity';
import { HeroEntity } from './entities/hero.entity';
import { LinkDetailEntity } from './entities/link-details.entity';
import { SectionEntity } from './entities/section.entity';
import { SideBoxEntity } from './entities/side-box.entity';
import { SocialLinksEntity } from './entities/social-links.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LinkEntity,
      StoreEntity,
      UserEntity,
      TokenEntity,
      MediaEntity,
      ItemEntity,
      ItemCategoryEntity,
      ItemSubCategoryEntity,
      AdvertisementSectionEntity,
      CarouselEntity,
      FooterEntity,
      HeaderEntity,
      HeroEntity,
      LinkDetailEntity,
      SectionEntity,
      SideBoxEntity,
      SocialLinksEntity,
    ]),
  ],
  controllers: [LinkController],
  providers: [
    LinkService,
    JwtService,
    ConfigService,
    TokenService,
    MediaService,
    S3Service,
    ItemService,
  ],
})
export class LinkModule {}
