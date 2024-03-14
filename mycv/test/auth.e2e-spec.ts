import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

/* ao executar testes e2e, caso existam middlewares como ValidationPipes ou o Session, não possuimos acesso a
  essas instancias em um pripeiro momento, pois o comando "createNestApplication()" apenas considera o módulo principal
  e suas dependencias

  existem 2 soluções para isso
  1 - criar uma função isolada que recebe o "app" do main.ts e executar os mesmoms comandos de atribuição de middlewares
    - desse modo, basta importar essa função "setupApp(app)" dentro do main.ts e ele continuará funcionando
    - no arquivo de testes e2e,após a criação "app = moduleFixture.createNestApplication();", bastaria chamar essa mesma função setupApp(app)

  2 - passar os middlewares para o modulo inicial do sistema "app.module"
*/
describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signUp request', () => {
    const email = 'taj@biota1.gt';

    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'asdf' })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email);
      });
  });
});
