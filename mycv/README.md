If you don't wish to downgrade TypeORM version and configuring the files using JS, then you can follow these steps I figured out from the documentation and googling

- To start, inside the 'src' folder create a 'data-source.ts' file and a 'config' folder, and inside that folder create a 'typeorm.config.ts' file.

- inside 'typeorm.config.ts' file, create a 'TypeOrmConfigService' class that implements  TypeOrmOptionsFactory'; we will import our newly created class and use it in the app.module.ts file specifically in the 'TypeOrmModule.forRootAsync()' function to give TypeOrm the needed information about the databases we will be using, and because we can inject ConfigService in this class and instantiate it in the constructor, we can easily use the configService.get() method to get our database environment variables to use(i.e 'development' vs 'test' vs 'production')

- our 'typeorm.config.ts' that contains our newly created 'TypeOrmConfigService' class will look like the following:

```ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) { }
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'sqlite',
      synchronize: false,
      database: this.configService.get<string>('DB_NAME'),
      autoLoadEntities: true,
    };
  }
}
```

And as I mentioned, now we need to import our class TypeOrmConfigService and use it in app.module.ts specifically in useClass: property in forRootAsync() function file as follows:

```ts
...
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    UsersModule,
    ReportsModule,
...
```

- Now, we have configured our TypeORM to use the appropriate database, either be 'db.sqlie' for development , or  for test  'test.sqlite' or ':memory:' depending on what you chose to go with.

- The next step now is to take care of TypeOrm cli and get it to work in our project, and for that you need to know that we have to provide the data-source the cli will use to function appropriately.

- So, now we need to go to the ```data-source.ts``` file we created in the src folder, and we will create a DataSource instance that will contain the needed database information. and it shall look like the following:

```ts
import { DataSource, DataSourceOptions } from 'typeorm';

export const appDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: ['**/*.entity.ts'],
  migrations: [__dirname + '/migrations/*.ts'],
} as DataSourceOptions);

```

- And finally, to use typeorm cli and generate our migrations we will add this script to package.json:
```"typeorm": "cross-env NODE_ENV=development typeorm-ts-node-commonjs -d src/data-source.ts"```
instead of
```"typeorm": "cross-env NODE_ENV=development node --require ts-node/register ./node_modules/typeorm/cli.js",```

  - notice the -d src/data-source.ts , typeorm cli needs to know where that data-source file is located.

- And to generate our migrations we will write the following command:
```npm run typeorm migration:generate src/migrations/initial-schema```

- we specified the name of the file ```initial-schema``` along with our intention to create a folder called ```migrations src/migrations/initial-schema```

And to run our migration we need to execute :
```npm run typeorm migration:run```

(TypeOrm cli will know where to look for migrations thanks to migrations: [..] property that we defined in our data-source.ts file)

## License

Nest is [MIT licensed](LICENSE).
