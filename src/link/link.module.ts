import { Module } from '@nestjs/common';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinkEntity } from './link.entity';
import { StoreEntity } from 'src/store/store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LinkEntity, StoreEntity])],
  controllers: [LinkController],
  providers: [LinkService],
})
export class LinkModule {}
