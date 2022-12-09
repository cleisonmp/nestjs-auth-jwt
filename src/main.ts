import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { startSwagger } from './config/swagger'
import { PrismaClientExceptionFilter } from './exception-filters/prisma-client-exception/prisma-client-exception.filter'
import { PrismaService } from './prisma/prisma.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  //https://docs.nestjs.com/recipes/prisma#issues-with-enableshutdownhooks
  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  )

  app.useGlobalFilters(new PrismaClientExceptionFilter())

  startSwagger(app)

  await app.listen(3333)
}
bootstrap().catch((error) => console.error(error))
