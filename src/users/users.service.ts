import { ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import * as argon from 'argon2'
import { UserNotFoundError } from '../errors/user'
import { PrismaService } from '../prisma/prisma.service'
import type { CreateUserDto, UpdateUserDto } from './dto'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const password = await argon.hash(createUserDto.password)

    try {
      const user = await this.prisma.user.create({
        data: {
          ...createUserDto,
          password,
        },
      })
      return user
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ForbiddenException('Email is already registered.')
      }
      throw error
    }
  }

  findAll() {
    return this.prisma.user.findMany()
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } })
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } })
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      })
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new UserNotFoundError(id)
      }
      throw error
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.user.delete({
        where: { id },
      })
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new UserNotFoundError(id)
      }
      throw error
    }
  }
}
