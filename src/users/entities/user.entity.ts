import { ApiProperty } from '@nestjs/swagger'
import type { User } from '@prisma/client'

export class UserEntity implements User {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  email: string

  @ApiProperty()
  password: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}
