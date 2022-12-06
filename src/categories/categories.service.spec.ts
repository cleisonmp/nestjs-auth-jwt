import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { PrismaService } from '../prisma/prisma.service'
import { CategoriesService } from './categories.service'

describe('CategoriesService', () => {
  let service: CategoriesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesService, PrismaService],
    }).compile()

    service = module.get<CategoriesService>(CategoriesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
