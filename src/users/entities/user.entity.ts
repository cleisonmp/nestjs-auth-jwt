import { ApiProperty } from '@nestjs/swagger'
import type { User } from '@prisma/client'
import { Exclude } from 'class-transformer'

export class UserEntity implements User {
  @ApiProperty({
    example: '10ea9657-0255-4175-b610-00ea1379b5a8',
  })
  id: string

  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
  })
  name: string

  @ApiProperty({
    description: 'Email address of the user',
    example: 'mail@mail.com',
  })
  email: string

  @Exclude()
  password: string

  @ApiProperty({ example: '2022-12-08T20:18:57.135Z' })
  createdAt: Date

  @ApiProperty({ example: '2022-12-08T20:18:57.135Z' })
  updatedAt: Date

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial)
  }
}
