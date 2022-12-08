import { Injectable, UnauthorizedException } from '@nestjs/common'
import * as argon from 'argon2'
import type { CreateUserDto } from '../users/dto'
import { UsersService } from '../users/users.service'
import type { AuthDto } from './dto'

@Injectable()
export class AuthService {
  constructor(private readonly user: UsersService) {}

  async validateUser(email: string, password: string) {
    const user = await this.user.findByEmail(email)

    if (user) {
      const isPasswordCorrect = await argon.verify(user.password, password)

      if (isPasswordCorrect) {
        return user
      }
    }

    throw new UnauthorizedException('Invalid credentials')
  }

  async login(user: AuthDto) {
    return 'Logged in'
  }

  signup(createUserDto: CreateUserDto) {
    return this.user.create(createUserDto)
  }
}
