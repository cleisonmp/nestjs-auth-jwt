import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { SwaggerTheme } from 'swagger-themes'
import { AppModule } from './app.module'
import { PrismaService } from './prisma/prisma.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  //https://docs.nestjs.com/recipes/prisma#issues-with-enableshutdownhooks
  const prismaService = app.get(PrismaService)
  await prismaService.enableShutdownHooks(app)

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  )

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Generic Blog')
    .setDescription('The Generic Blog API description')
    .setVersion('0.1')
    .build()
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)
  const swaggerTheme = new SwaggerTheme('v3')
  const swaggerOptions = {
    explorer: true,
    customCss: swaggerTheme.getBuffer('dark'),
  }

  SwaggerModule.setup('api', app, swaggerDocument, swaggerOptions)

  await app.listen(3333)
}
bootstrap().catch((error) => console.error(error))
