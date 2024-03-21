import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users.service';

// ! ESSE INTERCEPTOR NÃO ESTA SENDO MAIS UTILIZADO, POIS FOI SUBSTITUIDO PELO MIDDLEWARE
@Injectable() //como queremos que ele participe do ciclo de Injenção de Dependencia, precisamos desse decorator
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) { }

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};

    if (userId) {
      const user = await this.usersService.findOne(userId);
      request.currentUser = user;
    }

    return handler.handle();
  }
}
