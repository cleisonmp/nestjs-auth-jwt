import { NotFoundException } from '@nestjs/common'

export class UserNotFoundError extends NotFoundException {
  constructor(id: string) {
    super(`Could not find user with id ${id}.`)
  }
}
