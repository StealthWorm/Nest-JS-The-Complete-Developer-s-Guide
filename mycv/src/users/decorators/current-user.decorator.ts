import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// criamos um decorator customizado, ao invés d eutilziar os conhecidos como @Body, @Param
export const CurrentUser = createParamDecorator(
  // o context é um wrapper que envolve a requisição, permite trabalhar com qualquer request, seja grpc, websocket, http, stc
  //  o "never" indica que não quereros que seja atribuido nada ao "data" como "@CurrentUser('name')"
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.currentUser;
  },
);
