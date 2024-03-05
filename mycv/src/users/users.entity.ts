import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  // @Exclude()
  password: string;

  // um hook do typrm para realziar uma ação após detectar um insert em uma tabela
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
