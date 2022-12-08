import type { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { SwaggerTheme } from 'swagger-themes'
import { author, description, repository, version } from '../../../package.json'

export const startSwagger = (app: INestApplication) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJs Auth with JWT')
    .setDescription(
      `${description} </br></br>
      <a href="${repository}" target="_blank">Repository</a>  </br>    
      <a href="${author}" target="_blank">@cleisonmp</a>
    `,
    )
    .setVersion(version)
    .addBearerAuth()
    .build()

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)

  const swaggerTheme = new SwaggerTheme('v3')
  const swaggerOptions = {
    explorer: true,
    customCss: swaggerTheme.getBuffer('dark'),
  }

  SwaggerModule.setup('api', app, swaggerDocument, swaggerOptions)
}
