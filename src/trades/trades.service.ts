import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Trade } from './entities/trade.entity';
import { Portfolio } from '../portfolio/entities/portfolio.entity';

import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';

@Injectable()
export class TradesService {
  constructor(
    @InjectRepository(Trade)
    private tradeRepository: Repository<Trade>,

    @InjectRepository(Portfolio)
    private portfolioRepository: Repository<Portfolio>,
  ) {}

  async create(createTradeDto: CreateTradeDto): Promise<Trade> {
    const { ticker, entry_price, exit_price, quantity, date, portfolioId } =
      createTradeDto;

    if (
      !ticker ||
      !entry_price ||
      !exit_price ||
      !quantity ||
      !date ||
      !portfolioId
    ) {
      throw new BadRequestException('All trade fields are required');
    }

    const portfolio = await this.portfolioRepository.findOneBy({
      id: portfolioId,
    });
    if (!portfolio) {
      throw new NotFoundException(`Portfolio with id ${portfolioId} not found`);
    }

    const trade = this.tradeRepository.create({
      ticker,
      entry_price,
      exit_price,
      quantity,
      date,
      portfolio,
    });

    return this.tradeRepository.save(trade);
  }

  async findAll(): Promise<Trade[]> {
    return this.tradeRepository.find();
  }

  async findOne(id: number): Promise<Trade> {
    const trade = await this.tradeRepository.findOne({ where: { id } });

    if (!trade) {
      throw new NotFoundException(`Trade with id ${id} not found`);
    }

    return trade;
  }

  async update(id: number, updateTradeDto: UpdateTradeDto): Promise<Trade> {
    const trade = await this.findOne(id);

    if (updateTradeDto.portfolioId) {
      const portfolio = await this.portfolioRepository.findOneBy({
        id: updateTradeDto.portfolioId,
      });
      if (!portfolio) {
        throw new NotFoundException(
          `Portfolio with id ${updateTradeDto.portfolioId} not found`,
        );
      }
      trade.portfolio = portfolio;
    }

    Object.assign(trade, updateTradeDto);
    return this.tradeRepository.save(trade);
  }

  async remove(id: number): Promise<void> {
    const trade = await this.findOne(id);
    await this.tradeRepository.remove(trade);
  }
}
