import { Expose, Transform } from 'class-transformer';
import { User } from 'src/users/users.entity';

// utiliza o ValidationPipe para validar o payload das requisições
export class ReportDto {
  @Expose()
  id: number;
  @Expose()
  price: number;
  @Expose()
  year: number;
  @Expose()
  lng: number;
  @Expose()
  lat: number;
  @Expose()
  make: string;
  @Expose()
  model: string;
  @Expose()
  mileage: number;

  @Transform(({ obj }) => obj.user.id) //vai buscar uma propriedade usuário e vai extrair somente o id
  @Expose()
  userId: number;
}
