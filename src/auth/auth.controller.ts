import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiBody,
} from '@nestjs/swagger'

import { LocalAuthGuard } from './guards/local-auth.guard'

import { CreateUserDto } from '../users/dto'
import { UserEntity } from '../users/entities/user.entity'
import { AuthService } from './auth.service'
import { AuthUserToken } from './entities/auth.entity'
import { AuthDto } from './dto'

interface AuthRequest extends Request {
  user: UserEntity
}

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: AuthUserToken })
  @ApiBody({ type: AuthDto })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  login(@Request() req: AuthRequest) {
    //env.
    return this.authService.login(req.user)
  }

  @Post('signup')
  @ApiCreatedResponse({ type: UserEntity })
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto)
  }
}
