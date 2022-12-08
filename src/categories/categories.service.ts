import { Injectable } from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { PrismaService } from '../prisma/prisma.service'
import { CategoryNotFoundError } from '../errors/categories'
import type { CreateCategoryDto, UpdateCategoryDto } from './dto'

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({ data: createCategoryDto })
  }

  findAll() {
    return this.prisma.category.findMany()
  }

  findOne(id: string) {
    return this.prisma.category.findUnique({ where: { id } })
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      return await this.prisma.category.update({
        where: { id },
        data: updateCategoryDto,
      })
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new CategoryNotFoundError(id)
      }
      throw error
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.category.delete({ where: { id } })
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new CategoryNotFoundError(id)
      }
      throw error
    }
  }
}
