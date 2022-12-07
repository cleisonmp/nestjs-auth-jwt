import { Injectable, UnauthorizedException } from '@nestjs/common'
import * as argon from 'argon2'
import { PrismaService } from '../prisma/prisma.service'
import type { CreateUserDto } from '../users/dto'
import { UsersService } from '../users/users.service'
import type { AuthDto } from './dto'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly user: UsersService,
  ) {}

  async login(authDto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: authDto.email,
      },
    })

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const isPasswordCorrect = await argon.verify(
      user.password,
      authDto.password,
    )

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid credentials')
    }

    return user
  }
  signup(createUserDto: CreateUserDto) {
    return this.user.create(createUserDto)
  }
}
