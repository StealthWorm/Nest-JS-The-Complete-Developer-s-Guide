import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ! foi para o app.module
  // app.use(
  //   cookieSession({
  //     keys: ['jkasy7ias6as'],
  //   }),
  // );
  // ! foi para o app.module
  // app.useGlobalPipes(
  // new ValidationPipe({
  //   whitelist: true, // essa linha garante que o corpo das requisições não possua divergencias com os DTOs, nao possuo propriedades faltando ou a mais
  // }),
  // );
  await app.listen(3000);
}
bootstrap();
