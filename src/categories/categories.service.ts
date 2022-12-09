import { ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { PrismaService } from '../prisma/prisma.service'
import { CategoryNotFoundError } from '../errors/categories'
import type { CreateCategoryDto, UpdateCategoryDto } from './dto'

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.prisma.category.create({
        data: createCategoryDto,
      })
      return category
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ForbiddenException(
          `A category is already registered with name ${createCategoryDto.name}.`,
        )
      }
      throw error
    }
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
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2002':
            throw new ForbiddenException(
              `A category is already registered with name ${updateCategoryDto.name}.`,
            )
          case 'P2025':
            throw new CategoryNotFoundError(id)
        }
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
