import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';
import { User } from '../users.entity';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable() //como queremos que ele participe do ciclo de Injenção de Dependencia, precisamos desse decorator
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) { }

  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};

    if (userId) {
      const user = await this.usersService.findOne(userId);
      // @ts-ignore
      req.currentUser = user;
      User;
    }

    next();
  }
}
