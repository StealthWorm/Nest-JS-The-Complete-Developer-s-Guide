import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './users.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          email: 'asdf@asdf.com',
          password: 'asdf',
        } as User);
      },
      find: (email: string) => {
        return Promise.resolve([{ id: 1, email, password: 'asdf' } as User]);
      },
      remove: (id: number) => {
        return Promise.resolve({ email: 'asdf@asdf.com' } as User);
      },
      update: (id: number, body: { email: string; password: string }) => {
        return Promise.resolve({
          id,
          email: body.email,
          password: body.password,
        } as User);
      },
    };
    fakeAuthService = {
      signUp: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
      signIn: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users with the given email', async () => {
    const users = await controller.findAllUsers('asdf@asdf.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('asdf@asdf.com');
  });

  it('findUser returns a single user with the given id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  });

  it('findUser throws an error if user with given id is not found', async () => {
    fakeUsersService.findOne = () => null;
    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
  });

  it('signIn updates session object and returns user', async () => {
    const session = { userId: -10 }; //mock da sessão
    const user = await controller.signIn(
      {
        email: 'asdf@asdf.com',
        password: 'password',
      },
      session,
    );

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });

  it('signUp creates a session object and returns user', async () => {
    const session = { userId: -10 }; //mock da sessão
    const user = await controller.createUser(
      {
        email: 'asdf@asdf.com',
        password: 'password',
      },
      session,
    );

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });

  it('signOut updates session to null ', () => {
    const session = { userId: 10 }; //mock da sessão
    controller.signOut(session);

    expect(session.userId).toBe(null);
  });

  it('whoAmI should retrieve the user logged in', async () => {
    const session = { userId: -10 }; //mock da sessão
    const user = await controller.signIn(
      {
        email: 'asdf@asdf.com',
        password: 'password',
      },
      session,
    );

    // const mockUser = { id: 1, username: 'testUser' };
    const result = controller.whoAmI(user);
    expect(session.userId).toEqual(1);
    expect(result).toEqual(user);
  });

  it('should delete a user with valid ID', () => {
    expect(controller.deleteUser('1')).resolves.toMatchObject({
      email: 'asdf@asdf.com',
    });
  });

  it('should update a user with valid ID', async () => {
    const body = {
      email: 'asdf@asdf.com',
      password: 'newpassword',
    };

    const user = await controller.updateUser('1', body);

    expect(user.email).toEqual('asdf@asdf.com');
  });
});
