import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  // @InjectRepository() indica para o sistema de Injeção de Dependencia que precisamos do Repository
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    // a razão de criarmos uma instancia de "User" antes de chamar o "repo.save" é pelo fato de podermos fazer validações em nossa entidade antes de persistir os dados
    const user = this.repo.create({ email, password });

    /* 
     !dentro de nossa Entity() criamos uma validação de LOG para cada operação na Enitidade (CRUD), porém, 
     !caso inserirmos o conteúdo do body direto no reposiotry "repo.save({email,password})"", mesmo que não 
     !gere erro e registre em banco, o Log não sera registrado, pois a validação não passou pela declaração 
     !da instancia da Entidade User. Isso pode gerar bugs ao tantar debug que são dificies de ver, por isso
     !manter atenção 
    */
    return this.repo.save(user);
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.repo.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    Object.assign(user, attrs);

    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.repo.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return this.repo.remove(user);
  }
}
/* 
insert() e update() trabalham com os dados a serem inseridos ou atualizados, logo não precisam de instancias de entidades.
poderiamos passar simplesmente insert({name, email})
o método save(), por outro lado, permite utilziar Hooks como o "AfterInsert" do TypeORM, justamente por esperar uma 
instancia de entidade. Por isso no método "create()" nós criamos uma instancia de User antes de chamar o ".save()"

o mesmo vale para o método "remove()". Se apenas deletarmos passando o ID usando ".delete(id)", ele não irá instancia a entidade, logo
 não mostrará o log "AfterRemove", por isso buscamos um objeto do tipo User e entçao usamos o ".remove(User)"
*/
