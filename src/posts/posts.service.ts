import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { PostNotFoundError } from '../errors/posts'
import { PrismaService } from '../prisma/prisma.service'
import type { CreatePostDto, UpdatePostDto } from './dto'

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  private serializeCategoryDataToInsert(categories: string[]) {
    interface categoryIdObj {
      id: string
    }

    return categories.map((id): categoryIdObj => {
      return { id }
    })
  }

  async create(createPostDto: CreatePostDto) {
    try {
      return await this.prisma.post.create({
        data: {
          title: createPostDto.title,
          body: createPostDto.body,
          author: { connect: { id: createPostDto.userId } },
          categories: {
            connect: this.serializeCategoryDataToInsert(
              createPostDto.categories,
            ),
          },
        },
      })
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(
          'Post could not be created because it depends on one or more records that were required but not found. Either userId or categories are wrong.',
        )
      }
      throw error
    }
  }

  findAll() {
    return this.prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        categories: true,
      },
    })
  }
  findOne(id: string) {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        categories: true,
      },
    })
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    //prisma ignores undefined values
    const prismaPostData = {
      title: updatePostDto.title,
      body: updatePostDto.body,
      author: updatePostDto.userId
        ? { connect: { id: updatePostDto.userId } }
        : undefined,
      categories: updatePostDto.categories
        ? {
            connect: this.serializeCategoryDataToInsert(
              updatePostDto.categories,
            ),
          }
        : undefined,
    }

    try {
      return await this.prisma.post.update({
        where: { id },
        data: prismaPostData,
      })
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(
          'Post could not be update because it depends on one or more records that were required but not found. Possible causes postId, userId or categories are wrong.',
        )
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
