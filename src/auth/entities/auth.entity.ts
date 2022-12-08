import { ApiProperty } from '@nestjs/swagger'

export class AuthUserToken {
  @ApiProperty()
  access_token: string
}

export class UserPayload {
  sub: string
  email: string
  name: string
  iat?: number
  exp?: number
}
