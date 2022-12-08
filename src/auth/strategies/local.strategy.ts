import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { LOCAL_STRATEGY_KEY } from '../guards/local-auth.guard'
import { AuthService } from '../auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(
  Strategy,
  LOCAL_STRATEGY_KEY,
) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' })
  }

  validate(email: string, password: string) {
    return this.authService.validateUser(email, password)
  }
}
