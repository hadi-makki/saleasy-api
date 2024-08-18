import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/request/login.dto';
import { RegisterDto } from './dtos/request/register.dto';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
} from 'src/error/api-responses.decorator';

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
  async test() {
    return this.AuthService.test();
  }
}
