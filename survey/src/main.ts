import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

const PORT = process.env.PORT || 8080

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(new ValidationPipe({ transform: true, forbidNonWhitelisted: true }))
    await app.listen(PORT)
}
bootstrap()
