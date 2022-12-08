import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type { ZodFormattedError } from 'zod'
import { z } from 'zod'

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  AUTH_JWT_SECRET: z.string(),
})
type ServerEnv = z.infer<typeof serverEnvSchema>

const formatErrors = (errors: ZodFormattedError<Map<string, string>, string>) =>
  Object.entries(errors)
    .map(([name, value]) => {
      if (value && '_errors' in value) {
        return `${name}: ${value._errors.join(', ')}\n`
      }
    })
    .filter(Boolean)

@Injectable()
export class EnvConfigService {
  private env: ServerEnv
  constructor(private configService: ConfigService) {
    //validate server env keys on start base of serverEnvSchema
    const zodSchemaKeys = Object.keys(serverEnvSchema.keyof().Values)
    const envValues: Record<string, unknown> = {}

    zodSchemaKeys.forEach((envKey) => {
      envValues[envKey as keyof typeof envValues] =
        this.configService.get(envKey)
    })

    const _serverEnv = serverEnvSchema.safeParse(envValues)

    if (!_serverEnv.success) {
      console.error(
        '❌ Invalid environment variables:\n',
        ...formatErrors(_serverEnv.error.format()),
      )
      throw new Error('Invalid environment variables')
    }
    this.env = _serverEnv.data
  }

  get keys(): ServerEnv {
    return this.env
  }
}
