import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS for frontend communication
  await app.listen(process.env.PORT ?? 3002); // Use 3002 as default to avoid conflict
}
bootstrap();


