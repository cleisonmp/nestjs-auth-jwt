import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import type { INestApplication } from '@nestjs/common'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './../src/app.module'
//import { PrismaService } from '../src/prisma/prisma.service'
import { useContainer } from 'class-validator'

describe('AppController (e2e)', () => {
  let app: INestApplication
  //let prisma: PrismaService

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    //prisma = app.get<PrismaService>(PrismaService)

    useContainer(app.select(AppModule), { fallbackOnErrors: true })
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))

    await app.init()
  })
})
