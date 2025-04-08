import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { Portfolio } from './entities/portfolio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio)
    private portfolioRepository: Repository<Portfolio>,
  ) {}

  create(dto: CreatePortfolioDto): Promise<Portfolio> {
    const portfolio = this.portfolioRepository.create(dto);
    return this.portfolioRepository.save(portfolio);
  }

  async findAll(): Promise<Portfolio[]> {
    return this.portfolioRepository.find({
      relations: ['trades'],
    });
  }

  async findOne(id: number): Promise<Portfolio> {
    const portfolio = await this.portfolioRepository.findOne({ where: { id } });
    if (!portfolio) {
      throw new NotFoundException(`Portfolio with ID ${id} not found`);
    }
    return portfolio;
  }

  async update(
    id: number,
    updatePortfolioDto: UpdatePortfolioDto,
  ): Promise<Portfolio> {
    const portfolio = await this.findOne(id);
    const updated = Object.assign(portfolio, updatePortfolioDto);
    return this.portfolioRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const result = await this.portfolioRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Portfolio with ID ${id} not found`);
    }
  }
}
