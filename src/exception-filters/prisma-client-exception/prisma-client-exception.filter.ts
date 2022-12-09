import type { Response } from 'express'
import type { ArgumentsHost } from '@nestjs/common'
import { HttpStatus, Catch } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'

import { Prisma } from '@prisma/client'

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const errorMessage = exception.message.replace(/\n/g, '')
    const message = `Unhandled Prisma Client Exception`

    const status = HttpStatus.INTERNAL_SERVER_ERROR
    response.status(status).json({
      statusCode: status,
      prismaCode: exception.code,
      message,
      errorMessage: errorMessage,
    })
  }
}
