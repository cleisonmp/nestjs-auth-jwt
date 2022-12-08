import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as argon from 'argon2'
import { EnvConfigService } from '../config/env/env.service'
import type { CreateUserDto } from '../users/dto'
import type { UserEntity } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'
import type { AuthUserToken, UserPayload } from './entities/auth.entity'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly envConfigService: EnvConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email)

    if (user) {
      const isPasswordCorrect = await argon.verify(user.password, password)

      if (isPasswordCorrect) {
        return {
          ...user,
          password: null,
        }
      }
    }

    throw new UnauthorizedException('Invalid credentials')
  }

  async login(user: UserEntity) {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    }
    const accessToken: AuthUserToken = {
      access_token: this.jwtService.sign(payload, {
        secret: this.envConfigService.keys.AUTH_JWT_SECRET,
        expiresIn: '15m',
      }),
    }

    return accessToken
  }

  signup(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }
}
