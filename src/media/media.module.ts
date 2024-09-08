import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Service } from 'src/s3/s3.service';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaEntity } from './media.entity';
import { HttpService } from '@nestjs/axios';
import { UserEntity } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/token/token.service';
import TokenEntity from 'src/token/token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MediaEntity, UserEntity, TokenEntity])],
  controllers: [MediaController],
  providers: [MediaService, S3Service, ConfigService, JwtService, TokenService],
})
export class MediaModule {}
