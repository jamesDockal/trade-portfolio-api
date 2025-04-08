import { Module } from '@nestjs/common';
import { TradesService } from './trades.service';
import { TradesController } from './trades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trade } from './entities/trade.entity';
import { Portfolio } from 'src/portfolio/entities/portfolio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trade, Portfolio])],
  controllers: [TradesController],
  providers: [TradesService],
})
export class TradesModule {}
