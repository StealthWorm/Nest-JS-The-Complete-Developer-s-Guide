import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

// CanActivate retorna um valor que indica se a request atual pode ou não prosseguir
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    return request.session.userId;
  }
}
