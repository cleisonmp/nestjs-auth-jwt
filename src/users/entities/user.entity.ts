import { ApiProperty } from '@nestjs/swagger'
import type { User } from '@prisma/client'
import { Exclude } from 'class-transformer'

export class UserEntity implements User {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  email: string

  @ApiProperty()
  @Exclude()
  password: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial)
  }
}
