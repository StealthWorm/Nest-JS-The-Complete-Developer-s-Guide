import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './users.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    // Create a fake copy os the UsersService methods "this.userService.create" and "this.userService.find"
    // these are the ony two methods from UserService that are being used for
    const users: User[] = [];

    fakeUsersService = {
      find: (email: string) => {
        const filteredUser = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUser);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          email,
          password,
        } as User;

        users.push(user);

        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService, // nesse caso precisa passar o AuthService pois esamos dando um module.get() diretamente para testar esse serviço
        //  essa linha significa "sempre que for requisitado uma instancia de UsersService, forneça os valores de "fakeUsersService""
        { provide: UsersService, useValue: fakeUsersService },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signUp('qOg7H@example.com', 'asdf');

    expect(user.password).not.toEqual('asdf');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async () => {
    // como declaramos o "fakeUsersService" como uma var local, podemos alterar como as funções deles funcionam,
    //  nesse caso atribuindo um email e senha que esperamos que sejam retornados como fake
    // fakeUsersService.find = () =>
    //   Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);
    await service.signUp('asdf@asdf.com', 'asdf');
    await expect(service.signUp('asdf@asdf.com', 'asdf')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('throws if signIn is called with an unused email', async () => {
    await expect(
      service.signIn('asdflkj@asdlfkj.com', 'passdflkj'),
    ).rejects.toThrow(NotFoundException);
  });

  it('throws if an invalid password is provided', async () => {
    // fakeUsersService.find = () =>
    //   Promise.resolve([
    //     { email: 'asdf@asdf.com', password: 'laskdjf' } as User,
    //   ]);
    await service.signUp('laskdjf@alskdfj.com', 'password');

    await expect(
      service.signIn('laskdjf@alskdfj.com', 'laksdlfkj'),
    ).rejects.toThrow(BadRequestException);
  });

  it('returns a user if correct password is provided', async () => {
    // fakeUsersService.find = () =>
    //   Promise.resolve([
    //     {
    //       email: 'asdf@asdf.com',
    //       password: 'laskdjf',
    //     } as User,
    //   ]);
    await service.signUp('laskdjf@alskdfj.com', 'password');

    const user = await service.signIn('laskdjf@alskdfj.com', 'password');

    expect(user).toBeDefined();
  });
});
