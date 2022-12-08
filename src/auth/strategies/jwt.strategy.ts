import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { EnvConfigService } from '../../config/env/env.service'
import type { UserPayload } from '../entities/auth.entity'

export const JWT_STRATEGY_KEY = 'jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_STRATEGY_KEY) {
  constructor(private readonly envConfigService: EnvConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envConfigService.keys.AUTH_JWT_SECRET,
    })
  }

  async validate(payload: UserPayload) {
    return payload
  }
}
