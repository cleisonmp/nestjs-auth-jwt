import { ApiProperty } from '@nestjs/swagger'
import { User } from '@prisma/client'
import type { Post, Category } from '@prisma/client'

export class PostEntity implements Post {
  @ApiProperty()
  id: string

  @ApiProperty()
  title: string

  @ApiProperty()
  body: string

  @ApiProperty()
  userId: string

  @ApiProperty()
  author: User

  @ApiProperty()
  categories: Category[]

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}
