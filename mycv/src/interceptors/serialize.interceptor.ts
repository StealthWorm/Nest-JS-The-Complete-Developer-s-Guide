import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

interface ClassConstructor {
  //esse argumento significa que espera qualquer classe, mas garante que, ao chamar o @Serialize ele não permita passar nada alem disso
  new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    //* Run something before a request is handled by the request handler
    // qualquer tratamento antes da solicitação ser tratada coloca aqui, ele executa antes de qualquer
    // coisa que é chamada no controller
    // console.log('Running before the handler', context);

    return handler.handle().pipe(
      map((data: any) => {
        //* Run something before the response is sent out
        // fazer algo antes da resposta ser enviada com os dados de saida coloca aqui
        // console.log('Running before the response is sent out', data);
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true, // garante que apenas iremos expor/excluir os dados definidos pelo esquema do DTO
        });
      }),
    );
  }
}
