import type { ExecutionContext } from '@nestjs/common'
import { createParamDecorator } from '@nestjs/common'
import type { UserEntity } from '../../users/entities/user.entity'

interface AuthRequest extends Request {
  user: UserEntity
}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<AuthRequest>()

    return request.user
  },
)
