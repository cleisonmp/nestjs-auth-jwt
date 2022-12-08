import type { MiddlewareConsumer, NestModule } from '@nestjs/common'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt/dist'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersModule } from '../users/users.module'
import { LocalStrategy } from './strategies/local.strategy'
import { LoginValidationMiddleware } from './middlewares/login-validation.middleware'
import { EnvConfigService } from '../config/env/env.service'

@Module({
  imports: [UsersModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, EnvConfigService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('auth/login')
  }
}
