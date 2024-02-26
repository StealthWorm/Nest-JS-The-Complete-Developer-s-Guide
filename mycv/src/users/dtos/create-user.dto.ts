import { IsString, IsEmail } from 'class-validator';

// utiliza o ValidationPipe para validar o payload das requisições
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
