import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  OneToMany,
} from 'typeorm';
import { Report } from '../reports/reports.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  // @Exclude()
  password: string;

  @Column({ default: true })
  admin: boolean;

  /*  
  OneToMany não altera a tabela onde é declarado, é criada uma associação em "user.reports"
  O motivo de envolvermos o "report" em uma function é pelo fato de existir uma dependencia 
  circular entre User e Report, logo uma das duas instancias ficaria sempre undefined. 
  */
  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  // um hook do typeorm para realizar uma ação após detectar um insert em uma tabela
  @AfterInsert()
  logInsert() {
    console.log('Inserted User with ID: ', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with ID: ', this.id);
  }

  @AfterRemove()
  logDelete() {
    console.log('Removed User with ID: ', this.id);
  }
}
