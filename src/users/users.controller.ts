import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { UserNotFoundError } from '../errors/users'
import { CreateUserDto, UpdateUserDto } from './dto'
import { UserEntity } from './entities/user.entity'
import { UsersService } from './users.service'

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('users')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Unauthorized',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  private serializeUser(user: UserEntity) {
    return new UserEntity(user)
  }

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  @ApiForbiddenResponse({ description: 'Email is already registered.' })
  @ApiBadRequestResponse({
    description: 'Invalid body fields formatting.',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.serializeUser(await this.usersService.create(createUserDto))
  }

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  @ApiNotFoundResponse({
    description: 'Could not find user with id X.',
  })
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id)

    if (!user) {
      throw new UserNotFoundError(id)
    }

    return this.serializeUser(user)
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: UserEntity })
  @ApiNotFoundResponse({
    description: 'Could not find user with id X.',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  @ApiNotFoundResponse({
    description: 'Could not find user with id X.',
  })
  async remove(@Param('id') id: string) {
    return this.serializeUser(await this.usersService.remove(id))
  }
}
