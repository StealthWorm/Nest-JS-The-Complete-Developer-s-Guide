import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { UserDto } from 'src/users/dtos/user.dto';

export class SerializeInterceptor implements NestInterceptor {
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
        return plainToClass(UserDto, data, {
          excludeExtraneousValues: true, // garante que apenas iremos expor/excluir os dados definidos pelo esquema do DTO
        });
      }),
    );
  }
}
