/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) { }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    if (process.env.NODE_ENV === 'development') {
      return {
        type: this.configService.get<any>('DB_TYPE'),
        // synchronize: false,
        synchronize: JSON.parse(this.configService.get<string>('SYNCHRONIZE')),
        database: this.configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
      };
    } else if (process.env.NODE_ENV === 'test') {
      return {
        type: this.configService.get<any>('DB_TYPE'),
        // synchronize: false,
        synchronize: JSON.parse(this.configService.get<string>('SYNCHRONIZE')),
        database: this.configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        migrationsRun: JSON.parse(
          this.configService.get<string>('MIGRATIONS_RUN'),
        ),
      };
    } else if (process.env.NODE_ENV === 'production') {
      const obj = {
        type: this.configService.get<any>('DB_TYPE'),
        // synchronize: false,
        synchronize: JSON.parse(this.configService.get<string>('SYNCHRONIZE')),
        url: process.env.DATABASE_URL,
        autoLoadEntities: true,
        migrationsRun: true,
        ssl: { // especifico para o heroku
          rejectUnauthorized: JSON.parse(this.configService.get<string>('SSL')),
        },
      };
      // console.log(obj);
      return obj;
    }
  }
}
