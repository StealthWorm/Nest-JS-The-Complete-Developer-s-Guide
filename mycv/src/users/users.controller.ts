import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Param,
  Query,
  Delete,
  NotFoundException,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './users.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
@Serialize(UserDto) // aplica o interceptor criado para todas as rotas, mas ainda é possivel definir um por rota
// @UseInterceptors(CurrentUserInterceptor) //serve para iterceptar a resposta
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}
  // @Get('/whoami')
  // whoAmI(@Session() session: any) {
  //   return this.usersService.findOne(session.userId);
  // }

  @Get('/whoami')
  @UseGuards(AuthGuard)
  // O Current user só é chamado após tratar o Interceptor, por isso garantimos queele ira retornar o user
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signUp(body.email, body.password);

    // criando o cookie com o userId
    session.userId = user.id;

    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    // é possivel que, ao chamar o sign in, ele nao retorne nenhum header com o session, pois após cadastrar, caso
    // não existam alterações no conteudo da sessão ele não reenvia no header
    const user = await this.authService.signIn(body.email, body.password);

    session.userId = user.id;

    return user;
  }

  // @UseInterceptors(new SerializeInterceptor(UserDto)) //serve para iterceptar a resposta
  // @Serialize(UserDto) //shorthand para o método acima, declarando uma função que faz a mesma coisa dentro do Interceptor
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

  // exemplo de como o cookie pode ser salvo e resgatado
  // @Get('colors/:color')
  // setColor(@Param('color') color: string, @Session() session: any) {
  //   session.color = color;
  // }

  // @Get('colors/')
  // getColor(@Session() session: any) {
  //   return session.color;
  // }
}
