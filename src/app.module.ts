import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { MediaModule } from './media/media.module';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [ConfigModule, DatabaseModule, MediaModule, S3Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
