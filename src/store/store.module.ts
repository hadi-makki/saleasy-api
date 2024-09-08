import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreEntity } from './store.entity';
import { MediaService } from 'src/media/media.service';
import { MediaEntity } from 'src/media/media.entity';
import { S3Service } from 'src/s3/s3.service';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/token/token.service';
import TokenEntity from 'src/token/token.entity';
import { LinkEntity } from 'src/link/link.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StoreEntity,
      MediaEntity,
      UserEntity,
      TokenEntity,
      LinkEntity,
    ]),
  ],
  controllers: [StoreController],
  providers: [
    StoreService,
    MediaService,
    S3Service,
    ConfigService,
    JwtService,
    TokenService,
  ],
})
export class StoreModule {}
