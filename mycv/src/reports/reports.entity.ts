import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/users.entity';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  approved: boolean;

  @Column()
  price: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  lng: number;

  @Column()
  lat: number;

  @Column()
  mileage: number;

  // ManyToOne altera a tabela atual, criando uma coluna user_id que vincula o usuário que criou o relatório
  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}
