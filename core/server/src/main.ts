import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const PORT = +process.env.API_PORT || 4000;

  await app.listen(PORT, () =>
    console.log('API service has been started on port: ' + PORT),
  );
}
bootstrap();
