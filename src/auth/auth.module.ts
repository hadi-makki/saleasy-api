import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserEntity } from '../user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenService } from '../token/token.service';
import { UserService } from '../user/user.service';
import TokenEntity from '../token/token.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AdminSeederService } from './admin-seeder.service';
import { UserModule } from '../user/user.module';
import { StoreEntity } from 'src/store/store.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, TokenEntity, StoreEntity]),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    ConfigService,
    TokenService,
    AdminSeederService,
  ],
})
export class AuthModule {}
