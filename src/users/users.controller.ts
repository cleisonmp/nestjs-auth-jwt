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
  NotFoundException,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'
import { CreateUserDto, UpdateUserDto } from './dto'
import { UserEntity } from './entities/user.entity'
import { UsersService } from './users.service'

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  private serializeUser(user: UserEntity) {
    return new UserEntity(user)
  }

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
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
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id)

    if (!user) {
      throw new NotFoundException(`Could not find user with id ${id}.`)
    }

    return this.serializeUser(user)
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: UserEntity })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id)
  }
}
