import { Portfolio } from 'src/portfolio/entities/portfolio.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Trade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ticker: string;

  @Column('decimal')
  entry_price: number;

  @Column('decimal')
  exit_price: number;

  @Column('int')
  quantity: number;

  @Column({ type: 'timestamp' })
  date: Date;

  @ManyToOne(() => Portfolio, (portfolio) => portfolio.trades, { eager: true })
  portfolio: Portfolio;
}
