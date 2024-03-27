import { APP_PIPE } from '@nestjs/core';
import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { Report } from './reports/reports.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, //indica que sera global, não precisando reimportar entre módulos
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    UsersModule,
    ReportsModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService], //injetamos no modulo do ORM o condigService que tem acesso ao ".env"
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          database: config.get<string>('DB_NAME'),
          entities: [User, Report],
          //! apenas para ambiente de DEV. Observa a estrutura das entidades e atualiza automaticamente o banco
          //! pode ser perigoso de usar em ambiente de produção, uma vez que reflete imediatamente as mudanças, podemos apagar dados importantes
          // ! antes de mandar para produção, definir como FALSE
          synchronize: true,
        };
      },
    }),
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'db.sqlite',
    //   entities: [User, Report],
    //   synchronize: true, //apenas para ambiente de desenvolvimento. Observa a estrutura das entidades e atualiza automaticamente o banco
    // }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      // da mesma forma que usamos o APP_INTERCEPTOR para um Interceptador global, usamos o APP_PIPE para definir um Pipe global
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true, // essa linha garante que o corpo das requisições não possua divergencias com os DTOs, nao possuo propriedades faltando ou a mais
      }),
    },
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) { }
  // essa config será chamada automaticamente sempre que nosso app começar a escutar o trafego de entrada, para todas as rotas
  //  com ela conseguimos instanciar o middleware junto com o contexto do app para utilizar nos testes e2e
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get('COOKIE_KEY')],
        }),
      )
      .forRoutes('*'); //definir as rotas que vão usar esse middleware
  }
}
