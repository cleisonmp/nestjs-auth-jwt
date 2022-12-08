import { Module } from '@nestjs/common'

import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './auth/auth.module'

import { UsersModule } from './users/users.module'
import { CategoriesModule } from './categories/categories.module'
import { PostsModule } from './posts/posts.module'
import { ConfigModule } from '@nestjs/config'

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
  providers: [],
})
export class AppModule {}
