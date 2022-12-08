import type { ExecutionContext } from '@nestjs/common'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

export const LOCAL_STRATEGY_KEY = 'local'

@Injectable()
export class LocalAuthGuard extends AuthGuard(LOCAL_STRATEGY_KEY) {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context)
  }

  //extend the default error handling for clearer error messages
  handleRequest<UserEntity>(err: Error, user: UserEntity) {
    if (err || !user) {
      throw new UnauthorizedException(err?.message)
    }

    return user
  }
}
