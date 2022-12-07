import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import type { CreatePostDto, UpdatePostDto } from './dto'

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  create(createPostDto: CreatePostDto) {
    return this.prisma.post.create({ data: createPostDto })
  }

  findAll() {
    return this.prisma.post.findMany()
  }

  findOne(id: string) {
    return this.prisma.post.findUnique({ where: { id } })
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return this.prisma.post.update({ where: { id }, data: updatePostDto })
  }

  remove(id: string) {
    return this.prisma.post.delete({ where: { id } })
  }
}
