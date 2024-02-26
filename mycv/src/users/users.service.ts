import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  // @InjectRepository() indica para o sistema de Injeção de Dependencia que precisamos do Repository
  constructor(@InjectRepository(User) private repo: Repository<User>) { }

  create(email: string, password: string) {
    // a razão de criarmos uma instancia de "User" antes de chamar o "repo.save" é pelo fato de podermos fazer validações em nossa entidade antes de persistir os dados
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }
}
