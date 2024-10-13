import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  allDefault,
  defaultCategoryItems,
  defaultFooter,
  defaultHeader,
  defaultHero,
  defaultSections,
  LinkEntity,
} from './entities/link.entity';
import { Repository } from 'typeorm';
import { StoreEntity } from 'src/store/store.entity';
import { NotFoundException } from 'src/error/not-found-error';
import { BadRequestException } from 'src/error/bad-request-error';
import { HeaderDto } from './dtos/req/update-header.dto';
import { MediaService } from 'src/media/media.service';
import { UserEntity } from 'src/user/user.entity';
import { AddCarouselItemDto } from './dtos/req/add-carousel-item';
import { v4 as uuid4 } from 'uuid';
import { EditCarouselItemDto } from './dtos/req/edit-carousel-item';
import { EditSideboxDto } from './dtos/req/edit-sidebox';
import { UpdateAdvertismentSectionDto } from './dtos/req/update-advertisment-section.dto';
import { CreateAddSectionDto } from './dtos/req/create-ad-section.dto';
import { isUUID } from 'class-validator';
import { StoreService } from 'src/store/store.service';
import { ItemService } from 'src/item/item.service';
import { ItemCategoryEntity } from 'src/item-category/item-category.entity';
import { SectionEntity, sectionsTypes } from './entities/section.entity';
import { AdvertisementSectionEntity } from './entities/advertisment-section.entity';
import { CarouselEntity } from './entities/carousel.entity';
import { FooterEntity } from './entities/footer.entity';
import { HeaderEntity } from './entities/header.entity';
import { HeroEntity } from './entities/hero.entity';
import { LinkDetailEntity } from './entities/link-details.entity';
import { SideBoxEntity } from './entities/side-box.entity';
import { SocialLinksEntity } from './entities/social-links.entity';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(LinkEntity)
    private linkRepository: Repository<LinkEntity>,
    @InjectRepository(StoreEntity)
    private storeRepository: Repository<StoreEntity>,
    @InjectRepository(AdvertisementSectionEntity)
    private advertisementSectionRepository: Repository<AdvertisementSectionEntity>,
    @InjectRepository(CarouselEntity)
    private carouselRepository: Repository<CarouselEntity>,
    @InjectRepository(FooterEntity)
    private readonly footerRepository: Repository<FooterEntity>,
    @InjectRepository(HeaderEntity)
    private readonly headerRepository: Repository<HeaderEntity>,
    @InjectRepository(HeroEntity)
    private readonly heroRepository: Repository<HeroEntity>,
    @InjectRepository(LinkDetailEntity)
    private readonly linkDetailRepository: Repository<LinkDetailEntity>,
    @InjectRepository(SectionEntity)
    private readonly sectionRepository: Repository<SectionEntity>,
    @InjectRepository(SideBoxEntity)
    private readonly sideBoxRepository: Repository<SideBoxEntity>,
    @InjectRepository(SocialLinksEntity)
    private readonly socialLinksRepository: Repository<SocialLinksEntity>,
    private readonly mediaService: MediaService,
    private readonly itemService: ItemService,
    @InjectRepository(ItemCategoryEntity)
    private itemCategoryRepository: Repository<ItemCategoryEntity>,
  ) {}
  async createLink() {
    const getStore = await this.storeRepository.findOne({
      where: { id: 'aecca3e4-23c4-4c1e-92ff-d9dabb1517df' },
    });
    const link = this.linkRepository.create({
      ...allDefault,
      store: getStore,
    });
    const newLink = await this.linkRepository.save(link);
    return newLink;
  }

  async updateHeader(storeId: string, header: HeaderDto) {
    // const getStore = await this.storeRepository.findOne({
    //   where: { id: storeId },
    //   relations: {
    //     link: true,
    //   },
    // });
    // if (!getStore) {
    //   throw new NotFoundException('Store not found');
    // }
    // if (header.isNewUploaded) {
    //   if (getStore.link.header.logo) {
    //     await this.mediaService.delete(getStore.link.header.logo);
    //   }
    //   getStore.logo = header.logo;
    //   await this.storeRepository.save(getStore);
    // }
    // getStore.link.header = header;
    // await this.linkRepository.save(getStore.link);
    // return getStore.link.header;
  }

  async addCarouseItem(
    image: Express.Multer.File,
    linkId: string,
    data: AddCarouselItemDto,
    user: UserEntity,
  ) {
    // const getLink = await this.linkRepository.findOne({
    //   where: { id: linkId },
    //   relations: {
    //     store: true,
    //   },
    // });
    // if (!getLink) {
    //   throw new NotFoundException('Link not found');
    // }
    // let media: string = (await this.mediaService.upload(image, user.id)).id;
    // const itemToAdd = {
    //   backgroundImage: media,
    //   id: uuid4(),
    //   link: {
    //     target: data.buttonTarget,
    //     title: data.buttonTitle,
    //   },
    //   text1: data.text1,
    //   text2: data.text2,
    //   text3: data.text3,
    //   text4: data.text4,
    // };
    // getLink.Hero.Carousel.push(itemToAdd);
    // await this.linkRepository.save(getLink);
    // return itemToAdd;
  }

  async updateCarouselItem(
    image: Express.Multer.File,
    linkId: string,
    data: EditCarouselItemDto,
    user: UserEntity,
  ) {
    const getLink = await this.linkRepository.findOne({
      where: { id: linkId },
      relations: {
        store: true,
      },
    });

    if (!getLink) {
      throw new NotFoundException('Link not found');
    }

    // const itemToUpdate = getLink.Hero.Carousel.find(
    //   (item) => item.id === data.itemId,
    // );

    // if (!itemToUpdate) {
    //   throw new NotFoundException('Item not found');
    // }

    // let media: string;
    // if (image) {
    //   media = (await this.mediaService.upload(image, user.id)).id;
    // } else {
    //   media = data.imageId;
    // }

    // if (itemToUpdate.backgroundImage && image) {
    //   await this.mediaService.delete(itemToUpdate.backgroundImage);
    // }

    // itemToUpdate.backgroundImage = media;
    // itemToUpdate.link = {
    //   target: data.buttonTarget,
    //   title: data.buttonTitle,
    // };
    // itemToUpdate.text1 = data.text1;
    // itemToUpdate.text2 = data.text2;
    // itemToUpdate.text3 = data.text3;
    // itemToUpdate.text4 = data.text4;

    // await this.linkRepository.save(getLink);

    // return itemToUpdate;
  }

  async deleteCarouselItem(linkId: string, itemId: string) {
    const getLink = await this.linkRepository.findOne({
      where: { id: linkId },
      relations: {
        store: true,
      },
    });

    if (!getLink) {
      throw new NotFoundException('Link not found');
    }

    // const itemToDelete = getLink.Hero.Carousel.find(
    //   (item) => item.id === itemId,
    // );

    // if (!itemToDelete) {
    //   throw new NotFoundException('Item not found');
    // }

    // if (itemToDelete.backgroundImage) {
    //   await this.mediaService.delete(itemToDelete.backgroundImage);
    // }

    // getLink.Hero.Carousel = getLink.Hero.Carousel.filter(
    //   (item) => item.id !== itemId,
    // );

    // await this.linkRepository.save(getLink);

    // return itemToDelete;
  }

  async updateSideBox(
    image: Express.Multer.File,
    linkId: string,
    SideboxId: string,
    data: EditSideboxDto,
    user: UserEntity,
  ) {
    const getLink = await this.linkRepository.findOne({
      where: { id: linkId },
      relations: {
        store: true,
      },
    });

    if (!getLink) {
      throw new NotFoundException('Link not found');
    }

    // const sideBoxToUpdateIndex = getLink.Hero.sideBoxes.findIndex(
    //   (item) => item.id === SideboxId,
    // );

    // let sideBoxToUpdate = getLink.Hero.sideBoxes[sideBoxToUpdateIndex];

    // if (!sideBoxToUpdate) {
    //   throw new NotFoundException('Sidebox not found');
    // }

    // let media: string;

    // if (image) {
    //   if (sideBoxToUpdate.backgroundImage) {
    //     await this.mediaService.delete(sideBoxToUpdate.backgroundImage);
    //   }
    //   media = (await this.mediaService.upload(image, user.id)).id;
    // } else {
    //   media = sideBoxToUpdate.backgroundImage;
    // }

    // sideBoxToUpdate.backgroundImage = media;
    // sideBoxToUpdate.text1 = data.text1;
    // sideBoxToUpdate.text2 = data.text2;
    // sideBoxToUpdate.text3 = data.text3;
    // sideBoxToUpdate.link = {
    //   target: data.linkTarget,
    //   title: data.linkText,
    // };

    // getLink.Hero.sideBoxes[sideBoxToUpdateIndex] = sideBoxToUpdate;

    // await this.linkRepository.save(getLink);

    // return sideBoxToUpdate;
  }

  async updateAdvertisementSection(
    linkId: string,
    sectionId: string,
    advertisementSectionId: string,
    data: UpdateAdvertismentSectionDto,
    image: Express.Multer.File,
    user: UserEntity,
  ) {
    console.log(linkId, sectionId, advertisementSectionId);
    const getLink = await this.linkRepository.findOne({
      where: { id: linkId },
      relations: {
        store: true,
      },
    });

    if (!getLink) {
      throw new NotFoundException('Link not found');
    }

    const sectionToUpdate = getLink.sections.find(
      (section) => section.id === sectionId,
    );

    if (!sectionToUpdate) {
      throw new NotFoundException('Section not found');
    }

    const advertisementSectionToUpdate =
      sectionToUpdate.advertisementSection.find(
        (advertisementSection) =>
          advertisementSection.id === advertisementSectionId,
      );

    // console.log(advertisementSectionToUpdate);

    // if (!advertisementSectionToUpdate) {
    //   throw new NotFoundException('Advertisement section not found');
    // }

    // let media: string;

    // if (image) {
    //   if (advertisementSectionToUpdate.backgroundImage) {
    //     await this.mediaService.delete(
    //       advertisementSectionToUpdate.backgroundImage,
    //     );
    //   }
    //   media = (await this.mediaService.upload(image, user.id)).id;
    // } else {
    //   media = advertisementSectionToUpdate.backgroundImage;
    // }

    // advertisementSectionToUpdate.backgroundImage = media;
    // advertisementSectionToUpdate.text1 = data.text1;
    // advertisementSectionToUpdate.text2 = data.text2;
    // advertisementSectionToUpdate.redText = data.redText;
    // advertisementSectionToUpdate.link = {
    //   target: data.linkTarget,
    //   title: data.linkTitle,
    // };

    // await this.linkRepository.save(getLink);

    // return advertisementSectionToUpdate;
  }

  async deleteAdvertisementSection(
    linkId: string,
    sectionId: string,
    advertisementSectionId: string,
  ) {
    const getLink = await this.linkRepository.findOne({
      where: { id: linkId },
      relations: {
        store: true,
      },
    });

    if (!getLink) {
      throw new NotFoundException('Link not found');
    }

    const sectionToUpdate = getLink.sections.find(
      (section) => section.id === sectionId,
    );

    if (!sectionToUpdate) {
      throw new NotFoundException('Section not found');
    }

    const advertisementSectionToDeleteIndex =
      sectionToUpdate.advertisementSection.findIndex(
        (advertisementSection) =>
          advertisementSection.id === advertisementSectionId,
      );

    if (advertisementSectionToDeleteIndex === -1) {
      throw new NotFoundException('Advertisement section not found');
    }

    const advertisementSectionToDelete =
      sectionToUpdate.advertisementSection[advertisementSectionToDeleteIndex];

    if (advertisementSectionToDelete.backgroundImage) {
      await this.mediaService.delete(
        advertisementSectionToDelete.backgroundImage,
      );
    }

    sectionToUpdate.advertisementSection =
      sectionToUpdate.advertisementSection.filter(
        (advertisementSection) =>
          advertisementSection.id !== advertisementSectionId,
      );

    await this.linkRepository.save(getLink);

    return advertisementSectionToDelete;
  }

  async addAdvertisementSection(
    linkId: string,
    sectionId: string,
    data: CreateAddSectionDto,
    image: Express.Multer.File,
    user: UserEntity,
  ) {
    const getLink = await this.linkRepository.findOne({
      where: { id: linkId },
      relations: {
        store: true,
      },
    });

    if (!getLink) {
      throw new NotFoundException('Link not found');
    }

    // const sectionToUpdate = getLink.sections.find(
    //   (section) => section.id === sectionId,
    // );

    // if (!sectionToUpdate) {
    //   throw new NotFoundException('Section not found');
    // }

    // let media: string = (await this.mediaService.upload(image, user.id)).id;

    // const advertisementSectionToAdd = {
    //   backgroundImage: media,
    //   id: uuid4(),
    //   link: {
    //     target: data.linkTarget,
    //     title: data.linkTitle,
    //   },
    //   text1: data.text1,
    //   text2: data.text2,
    //   redText: data.redText,
    // };

    // sectionToUpdate.advertisementSection.push(advertisementSectionToAdd);

    // await this.linkRepository.save(getLink);

    // return advertisementSectionToAdd;
  }

  async updateSectionName(linkId: string, sectionId: string, title: string) {
    const getLink = await this.linkRepository.findOne({
      where: { id: linkId },
      relations: {
        store: true,
      },
    });

    if (!getLink) {
      throw new NotFoundException('Link not found');
    }

    const sectionToUpdate = getLink.sections.find(
      (section) => section.id === sectionId,
    );

    if (!sectionToUpdate) {
      throw new NotFoundException('Section not found');
    }

    sectionToUpdate.title = title;

    await this.linkRepository.save(getLink);

    return {
      title: sectionToUpdate.title,
    };
  }

  async updateManuallySelectedItems(
    linkId: string,
    sectionId: string,
    items: string[],
  ) {
    const getLink = await this.linkRepository.findOne({
      where: { id: linkId },
      relations: {
        store: true,
      },
    });

    if (!getLink) {
      throw new NotFoundException('Link not found');
    }

    if (!items.length) {
      throw new BadRequestException('Items cannot be empty');
    }

    const sectionToUpdate = getLink.sections.find(
      (section) => section.id === sectionId,
    );

    if (
      !sectionToUpdate ||
      sectionToUpdate.type !== sectionsTypes.manually_selected
    ) {
      throw new NotFoundException('Section not found');
    }

    sectionToUpdate.items = items.map((item) => {
      if (isUUID(item)) {
        return item;
      }
    });

    await this.linkRepository.save(getLink);

    const getManuallySelectedItems =
      await this.itemService.getManuallySelectedItemsSection(getLink.store.id);

    return getManuallySelectedItems;
  }

  async removeManuallySelectedItem(
    linkId: string,
    sectionId: string,
    itemId: string,
  ) {
    const getLink = await this.linkRepository.findOne({
      where: { id: linkId },
      relations: {
        store: true,
      },
    });

    if (!getLink) {
      throw new NotFoundException('Link not found');
    }

    const sectionToUpdate = getLink.sections.find(
      (section) => section.id === sectionId,
    );

    if (
      !sectionToUpdate ||
      sectionToUpdate.type !== sectionsTypes.manually_selected
    ) {
      throw new NotFoundException('Section not found');
    }

    sectionToUpdate.items = sectionToUpdate.items.filter(
      (item) => item !== itemId,
    );

    await this.linkRepository.save(getLink);

    return {
      message: 'Item removed successfully',
    };
  }

  async updateCategorySection(
    linkId: string,
    sectionId: string,
    categoryId: string,
  ) {
    const getLink = await this.linkRepository.findOne({
      where: { id: linkId },
      relations: {
        store: true,
      },
    });
    if (!getLink) {
      throw new NotFoundException('Link not found');
    }

    const checkCategory = await this.itemCategoryRepository.findOne({
      where: { id: categoryId },
    });

    if (!checkCategory) {
      throw new NotFoundException('Category not found');
    }

    const sectionToUpdate = getLink.sections.find(
      (section) => section.id === sectionId,
    );
    if (
      !sectionToUpdate ||
      sectionToUpdate.type !== sectionsTypes.category_related
    ) {
      throw new NotFoundException('Section not found');
    }
    sectionToUpdate.categoryId = categoryId;
    await this.linkRepository.save(getLink);

    const getCategoryRelatedItems =
      await this.itemService.getCategoryItemsSection(getLink.store.id);

    return getCategoryRelatedItems;
  }

  async createDefaultLink(storeId: string) {
    const getStore = await this.storeRepository.findOne({
      where: { id: storeId },
    });

    if (!getStore) {
      throw new NotFoundException('Store not found');
    }

    // create default header
    const socialLinks = await this.socialLinksRepository.save({
      instagram: defaultHeader.links.instagram,
      facebook: defaultHeader.links.facebook,
      twitter: defaultHeader.links.twitter,
    });

    const header = await this.headerRepository.save({
      logo: defaultHeader.logo,
      logoSize: defaultHeader.logoSize,
      links: socialLinks,
      shippingFee: defaultHeader.shippingFee,
    });
    // create default header

    //create default hero
    const courselLink = await this.linkDetailRepository.save({
      title: defaultHero.Carousel[0].link.title,
      target: defaultHero.Carousel[0].link.target,
    });
    const corousel = await this.carouselRepository.save({
      backgroundImage: defaultHero.Carousel[0].backgroundImage,
      link: courselLink,
      text1: defaultHero.Carousel[0].text1,
      text2: defaultHero.Carousel[0].text2,
      text3: defaultHero.Carousel[0].text3,
      text4: defaultHero.Carousel[0].text4,
    });

    const sidebox1Link = await this.linkDetailRepository.save({
      title: defaultHero.sideBoxes[0].link.title,
      target: defaultHero.sideBoxes[0].link.target,
    });
    const sideBox1 = await this.sideBoxRepository.save({
      backgroundImage: defaultHero.sideBoxes[0].backgroundImage,
      text1: defaultHero.sideBoxes[0].text1,
      text2: defaultHero.sideBoxes[0].text2,
      text3: defaultHero.sideBoxes[0].text3,
      link: sidebox1Link,
    });

    const sidebox2Link = await this.linkDetailRepository.save({
      title: defaultHero.sideBoxes[1].link.title,
      target: defaultHero.sideBoxes[1].link.target,
    });
    const sideBox2 = await this.sideBoxRepository.save({
      backgroundImage: defaultHero.sideBoxes[1].backgroundImage,
      text1: defaultHero.sideBoxes[1].text1,
      text2: defaultHero.sideBoxes[1].text2,
      text3: defaultHero.sideBoxes[1].text3,
      link: sidebox2Link,
    });

    const hero = await this.heroRepository.save({
      Carousel: [corousel],
      sideBoxes: [sideBox1, sideBox2],
    });
    // create default hero

    // create default categories
    const defaultCategories = defaultCategoryItems;
    // create default categories

    // create default sections
    const sections = await Promise.all(
      defaultSections.map(
        async (section: {
          id: string;
          title: string;
          categoryId: string;
          type: sectionsTypes;
          advertisementSection: {
            id: string;
            text1: string;
            text2: string;
            backgroundImage: string;
            redText: string;
            link: {
              title: string;
              target: string;
            };
          }[];
        }) => {
          let advertisementSection: AdvertisementSectionEntity[] = [];
          if (section.advertisementSection) {
            console.log(
              'section.advertisementSection',
              section.advertisementSection,
            );
            advertisementSection = await Promise.all(
              section.advertisementSection.map(async (advertisementSection) => {
                const link = await this.linkDetailRepository.save({
                  title: advertisementSection.link.title,
                  target: advertisementSection.link.target,
                });
                console.log('this is the ad section', advertisementSection);
                const saveAd = this.advertisementSectionRepository.create({
                  backgroundImage: advertisementSection.backgroundImage,
                  link: link,
                  text1: advertisementSection.text1 || 'test',
                  text2: advertisementSection.text2 || 'test',
                  redText: advertisementSection.redText || 'test',
                });
                const saveAd2 =
                  await this.advertisementSectionRepository.save(saveAd);
                return saveAd2;
              }),
            );
          }

          return this.sectionRepository.save({
            title: section.title,
            type: section.type,
            advertisementSection: advertisementSection,
          });
        },
      ),
    );
    console.log(sections);
    // create default sections

    // create default footer
    const footer = await this.footerRepository.save({
      descriptionText: defaultFooter.descriptionText,
    });
    // create default footer

    // create default link
    const link = this.linkRepository.create({
      store: getStore,
      header: header,
      hero: hero,
      categoryItems: defaultCategories,
      sections: sections,
      footer: footer,
    });
    const newLink = await this.linkRepository.save(link);
    // create default link

    return newLink;
  }
}
