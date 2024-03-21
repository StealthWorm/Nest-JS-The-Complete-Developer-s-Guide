import { CanActivate, ExecutionContext } from '@nestjs/common';

// CanActivate retorna um valor que indica se a request atual pode ou não prosseguir
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (!request.currentUser) {
      return false;
    }

    return request.currentUser.admin;
  }
}
