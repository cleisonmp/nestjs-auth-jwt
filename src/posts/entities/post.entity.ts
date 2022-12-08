import { ApiProperty } from '@nestjs/swagger'
import { User } from '@prisma/client'
import type { Post, Category } from '@prisma/client'
import { CategoryEntity } from '../../categories/entities/category.entity'
import { UserEntity } from '../../users/entities/user.entity'

export class PostEntity implements Post {
  @ApiProperty({
    example: '10ea9657-0255-4175-b610-00ea1379b5a8',
  })
  id: string

  @ApiProperty({
    description: 'Post title',
    example: 'Lorem Ipsum Dolor',
  })
  title: string

  @ApiProperty({
    description: 'Post content',
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed venenatis finibus porttitor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam est tellus, accumsan a hendrerit vel, condimentum vitae sem. Donec id est in lectus efficitur maximus. Nulla dignissim nisi a orci condimentum, sed fermentum elit commodo. Duis bibendum auctor sodales. Curabitur id placerat ex. Donec mollis vehicula viverra. Nam ultricies justo justo, vitae congue dolor pulvinar luctus. Aliquam venenatis sapien eros, nec volutpat justo gravida ac. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae',
  })
  body: string

  @ApiProperty({
    example: '10ea9657-0255-4175-b610-00ea1379b5a8',
  })
  userId: string

  @ApiProperty({ description: 'Post author', type: UserEntity })
  author: User

  @ApiProperty({ type: CategoryEntity, isArray: true })
  categories: Category[]

  @ApiProperty({ example: '2022-12-08T20:18:57.135Z' })
  createdAt: Date

  @ApiProperty({ example: '2022-12-08T20:18:57.135Z' })
  updatedAt: Date
}
