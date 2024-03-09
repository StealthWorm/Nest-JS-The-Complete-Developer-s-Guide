import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User])], //perceba que não usamos o "forRoot", pois este serve apenas para instanciar a primeira chamada
  providers: [
    UsersService,
    AuthService,
    {
      // esse tipo de declaração torna o interceptor para escopo global
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
  ],
})
export class UsersModule {}
