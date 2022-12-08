import { ApiProperty } from '@nestjs/swagger'
import type { Category } from '@prisma/client'

export class CategoryEntity implements Category {
  @ApiProperty({
    example: '10ea9657-0255-4175-b610-00ea1379b5a8',
  })
  id: string

  @ApiProperty({
    description: 'Category name',
    example: 'Technology',
  })
  name: string

  @ApiProperty({ example: '2022-12-08T20:18:57.135Z' })
  createdAt: Date

  @ApiProperty({ example: '2022-12-08T20:18:57.135Z' })
  updatedAt: Date
}
