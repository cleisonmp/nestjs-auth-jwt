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
  ApiForbiddenResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
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

  //route decorators
  @Post('login')
  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  //api docs
  @ApiOkResponse({ type: AuthUserToken, description: 'JWT Signed token' })
  @ApiBody({ type: AuthDto })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  login(@Request() req: AuthRequest) {
    return this.authService.login(req.user)
  }

  //route decorators
  @IsPublic()
  @Post('signup')
  //api docs
  @ApiCreatedResponse({ type: UserEntity })
  @ApiBadRequestResponse({
    description: 'Invalid body fields formatting.',
  })
  @ApiForbiddenResponse({ description: 'Email is already registered.' })
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto)
  }

  //route decorators
  @Get('/me')
  //api docs
  @ApiCreatedResponse({ type: UserPayload })
  @ApiBearerAuth()
  getMe(@CurrentUser() currentUser: UserPayload) {
    return currentUser
  }
}
