import { NotFoundException } from '@nestjs/common'

export class CategoryNotFoundError extends NotFoundException {
  constructor(id: string) {
    super(`Could not find category with id ${id}.`)
  }
}
