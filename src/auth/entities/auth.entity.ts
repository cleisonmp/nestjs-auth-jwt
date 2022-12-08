import { ApiProperty } from '@nestjs/swagger'

export class AuthUserToken {
  @ApiProperty({
    description: 'JWT Signed token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZDk5ZWJkYy00MDNiLTQ5NjYtOWMxNy02NjM2NzRhNTVlNDQiLCJlbWFpbCI6Im1haWxAbWFpbC5jb20iLCJuYW1lIjoic3RyaW5nIiwiaWF0IjoxNjcwNTE5ODA1LCJleHAiOjE2NzA1MjA3MDV9.AZL-lK8ISD6EZXrXD5JUpNeXkuwuR8awK_lvkeLhLKQ',
  })
  access_token: string
}

export class UserPayload {
  @ApiProperty({
    description: 'User database ID',
    example: 'fd99ebdc-403b-4966-9c17-663674a55e44',
  })
  sub: string

  @ApiProperty({
    description: 'Email address of the user',
    example: 'mail@mail.com',
  })
  email: string

  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
  })
  name: string

  @ApiProperty({
    description:
      'Issued At, Identifies the time at which the JWT was issued in seconds since unix epoch.',
    example: '1670519805',
  })
  iat?: number

  @ApiProperty({
    description:
      'Expiration Time, Identifies the expiration time on or after which the JWT MUST NOT be accepted for processing in seconds since unix epoch.',
    example: '1670520705',
  })
  exp?: number
}
