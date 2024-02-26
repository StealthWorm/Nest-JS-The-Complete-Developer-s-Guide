import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // essa linha garante que o corpo das requisições não possua divergencias com os DTOs, nao possuo propriedades faltando ou a mais
    }),
  );
  await app.listen(3000);
}
bootstrap();
