import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import type { CreateUserDto } from '../users/dto/create-user.dto'
import { UsersService } from '../users/users.service'
import type { AuthDto } from './dto'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly user: UsersService,
  ) {}

  login(authDto: AuthDto) {
    return { mes: authDto }
  }
  signup(createUserDto: CreateUserDto) {
    return this.user.create(createUserDto)
  }
}
