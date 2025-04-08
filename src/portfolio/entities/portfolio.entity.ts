import { Trade } from 'src/trades/entities/trade.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Portfolio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('float')
  initialAmount: number;

  @OneToMany(() => Trade, (trade) => trade.portfolio, { cascade: true })
  trades: Trade[];
}
