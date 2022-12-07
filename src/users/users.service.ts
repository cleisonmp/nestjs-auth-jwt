import { Injectable } from '@nestjs/common'
import * as argon from 'argon2'
import { PrismaService } from '../prisma/prisma.service'
import type { CreateUserDto, UpdateUserDto } from './dto'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const password = await argon.hash(createUserDto.password)

    return this.prisma.user.create({ data: { ...createUserDto, password } })
  }

  findAll() {
    return this.prisma.user.findMany()
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } })
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: updateUserDto })
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } })
  }
}
