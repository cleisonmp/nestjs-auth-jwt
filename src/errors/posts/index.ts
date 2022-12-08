import { NotFoundException } from '@nestjs/common'

export class PostNotFoundError extends NotFoundException {
  constructor(id: string) {
    super(`Could not find post with id ${id}.`)
  }
}
