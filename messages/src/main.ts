import { NestFactory } from '@nestjs/core';
import { MessagesModule } from './messages/messages.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(MessagesModule);

  //  podemos aplicar pipes para rotas isoladas se precisarmos, mas nesse caso queremos validar todas as requisições
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
