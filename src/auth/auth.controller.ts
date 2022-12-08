import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { LocalAuthGuard } from './guards/local-auth.guard'

import { CreateUserDto } from '../users/dto'
import { UserEntity } from '../users/entities/user.entity'
import { AuthService } from './auth.service'
import { AuthDto } from './dto'

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  login(@Body() authDto: AuthDto) {
    //env.
    return this.authService.login(authDto)
  }

  @Post('signup')
  @ApiCreatedResponse({ type: UserEntity })
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto)
  }
}
