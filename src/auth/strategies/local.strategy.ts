import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { LOCAL_STRATEGY_KEY } from '../guards/local-auth.guard'
import { AuthService } from '../auth.service'
import type { AuthDto } from '../dto'

@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  LOCAL_STRATEGY_KEY,
) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' })
  }

  validate(authDto: AuthDto) {
    return this.authService.validateUser(authDto)
  }
}
