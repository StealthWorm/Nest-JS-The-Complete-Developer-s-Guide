import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { AuthService } from './auth.service';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';
// import { APP_INTERCEPTOR } from '@nestjs/core';
// import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User])], //perceba que não usamos o "forRoot", pois este serve apenas para instanciar a primeira chamada
  providers: [
    UsersService,
    AuthService,
    // {
    // esse tipo de declaração torna o interceptor para escopo global
    //   provide: APP_INTERCEPTOR,
    //   useClass: CurrentUserInterceptor,
    // },
  ],
})
export class UsersModule {
  // essa config será chamada automaticamente sempre que nosso app começar a escutar o trafego de entrada APENAS para as rotas de Users
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
