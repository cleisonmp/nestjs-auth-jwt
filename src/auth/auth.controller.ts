import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from '../users/dto'
import { UserEntity } from '../users/entities/user.entity'
import { AuthService } from './auth.service'
import { AuthDto } from './dto'

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOkResponse()
  login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto)
  }

  @Post('signup')
  @ApiCreatedResponse({ type: UserEntity })
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto)
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  findOne(@Param('id') id: string) {
    //return this.authService.findUnique(id)
    return 'findOne' + id
  }
}
