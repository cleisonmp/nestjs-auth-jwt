import { Injectable } from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { PostNotFoundError } from '../errors/posts'
import { PrismaService } from '../prisma/prisma.service'
import type { CreatePostDto, UpdatePostDto } from './dto'

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  private serializePostDataToInsert(postDto: UpdatePostDto) {
    interface categoryIdObj {
      id: string
    }

    const categories = postDto.categories?.map((id): categoryIdObj => {
      return { id }
    })

    return {
      title: postDto.title ?? '',
      body: postDto.body ?? '',
      author: { connect: { id: postDto.userId } },
      categories: {
        connect: categories,
      },
    }
  }

  create(createPostDto: CreatePostDto) {
    return this.prisma.post.create({
      data: this.serializePostDataToInsert(createPostDto),
    })
  }

  findAll() {
    return this.prisma.post.findMany()
  }

  findOne(id: string) {
    return this.prisma.post.findUnique({ where: { id } })
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    try {
      return this.prisma.post.update({
        where: { id },
        data: this.serializePostDataToInsert(updatePostDto),
      })
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new PostNotFoundError(id)
      }
      throw error
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.post.delete({ where: { id } })
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new PostNotFoundError(id)
      }
      throw error
    }
  }
}
