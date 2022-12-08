import { ApiProperty } from '@nestjs/swagger'
import type { Category } from '@prisma/client'

export class CategoryEntity implements Category {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date
}
