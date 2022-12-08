import {
  Body,
  Controller,
  Get,
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

import { AuthUserToken, UserPayload } from './entities/auth.entity'
import { IsPublic } from './decorators/is-public.decorator'
import { CurrentUser } from './decorators/current-user.decorator'
import { CreateUserDto } from '../users/dto'
import { UserEntity } from '../users/entities/user.entity'

import { AuthService } from './auth.service'
import { AuthDto } from './dto'

interface AuthRequest extends Request {
  user: UserEntity
}

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: AuthUserToken })
  @ApiBody({ type: AuthDto })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  login(@Request() req: AuthRequest) {
    return this.authService.login(req.user)
  }

  @Post('signup')
  @ApiCreatedResponse({ type: UserEntity })
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto)
  }

  @Get('/me')
  @ApiCreatedResponse({ type: UserPayload })
  getMe(@CurrentUser() currentUser: UserPayload) {
    return currentUser
  }
}
