import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";

// ao executar a aplicação o NEST procura peloas modules e instancia as dependencias inferidas por ele
// nesse caso, temos instanciado um controller
@Module({
  controllers: [AppController]
})

export class AppModule {

}