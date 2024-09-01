import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { User } from '../decorators/users.decorator';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
} from '../error/api-responses.decorator';
import { AdminAuthGuard } from '../guards/admin.guard';
import { UserEntity } from '../user/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/request/login.dto';
import { RegisterDto } from './dtos/request/register.dto';

@Controller('auth')
@ApiTags('auth')
@ApiBadRequestResponse()
@ApiInternalServerErrorResponse()
@ApiNotFoundResponse()
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('register')
  @ApiBody({
    type: RegisterDto,
  })
  async register(@Body() registerDto: RegisterDto) {
    return this.AuthService.register(registerDto);
  }

  @Post('login')
  @ApiBody({
    type: LoginDto,
  })
  async login(@Body() loginDto: LoginDto) {
    return await this.AuthService.login(loginDto);
  }

  @Get('test')
  @ApiBearerAuth()
  @UseGuards(AdminAuthGuard)
  async test(@User() user: UserEntity) {
    return this.AuthService.test();
  }
}
