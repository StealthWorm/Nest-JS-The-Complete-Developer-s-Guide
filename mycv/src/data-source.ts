/* eslint-disable prettier/prettier */
import { DataSource, DataSourceOptions } from 'typeorm';

export const appDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: ['**/*.entity.ts'],
  migrations: [__dirname + '/migrations/*{.js,.ts}'],
  // migrations: ["dist/migrations/**/*{.js,.ts}"],
  migrationsRun: true
} as DataSourceOptions);