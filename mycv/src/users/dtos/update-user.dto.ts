import { IsString, IsEmail, IsOptional } from 'class-validator';

// utiliza o ValidationPipe para validar o payload das requisições
export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;
}
