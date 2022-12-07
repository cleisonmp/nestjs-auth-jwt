import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
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

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    })
  }

  remove(id: string) {
    return this.prisma.category.delete({ where: { id } })
  }
}