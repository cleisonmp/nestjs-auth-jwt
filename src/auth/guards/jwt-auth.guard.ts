import type { ExecutionContext } from '@nestjs/common'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { AuthGuard } from '@nestjs/passport'

import { IS_PUBLIC_KEY } from '../decorators/is-public.decorator'
import { JWT_STRATEGY_KEY } from '../strategies/jwt.strategy'

@Injectable()
export class JwtAuthGuard extends AuthGuard(JWT_STRATEGY_KEY) {
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) {
      return true
    }

    const canActivate = super.canActivate(context)

    if (typeof canActivate === 'boolean') {
      return canActivate
    }

    const canActivatePromise = canActivate as Promise<boolean>

    return canActivatePromise.catch((error) => {
      throw new UnauthorizedException(error.message)
    })
  }
}
