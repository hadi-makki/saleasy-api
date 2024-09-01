import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MediaModule } from './media/media.module';
import { S3Module } from './s3/s3.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { loggerMiddleware } from './logger/logger.service';
import { ItemModule } from './item/item.module';
import { ItemCategoryModule } from './item-category/item-category.module';
import { LinkModule } from './link/link.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    MediaModule,
    S3Module,
    UserModule,
    AuthModule,
    TokenModule,
    ItemModule,
    ItemCategoryModule,
    LinkModule,
    // LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(loggerMiddleware).forRoutes('*'); // Apply to all routes
  }
}
