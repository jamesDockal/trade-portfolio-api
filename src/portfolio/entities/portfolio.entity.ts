import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Portfolio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('float')
  initialAmount: number;
}
