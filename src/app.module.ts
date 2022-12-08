import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'

import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './auth/auth.module'

import { UsersModule } from './users/users.module'
import { CategoriesModule } from './categories/categories.module'
import { PostsModule } from './posts/posts.module'

import { JwtAuthGuard } from './auth/guards/jwt-auth.guard'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    CategoriesModule,
    PostsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
