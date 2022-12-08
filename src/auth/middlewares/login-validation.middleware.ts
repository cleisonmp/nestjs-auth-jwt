import type { NestMiddleware } from '@nestjs/common'
import { BadRequestException, Injectable } from '@nestjs/common'
import type { NextFunction, Request, Response } from 'express'
import { validate } from 'class-validator'

import { AuthDto } from '../dto'
/**
 * Custom validation middleware for login route since
 * guards are executed after each middleware, but before any interceptor or pipe.
 * @docs https://docs.nestjs.com/faq/request-lifecycle
 */
@Injectable()
export class LoginValidationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body

    const loginRequestBody = new AuthDto()
    loginRequestBody.email = body.email
    loginRequestBody.password = body.password

    const validations = await validate(loginRequestBody)

    if (validations.length) {
      throw new BadRequestException(
        validations.reduce((acc: string[], curr) => {
          if (curr.constraints) {
            return [...acc, ...Object.values(curr.constraints)]
          }
        }, []),
      )
    }

    next()
  }
}
