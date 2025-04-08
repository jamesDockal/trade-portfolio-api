export class CreateTradeDto {
  ticker: string;
  entry_price: number;
  exit_price: number;
  quantity: number;
  date: Date;
  portfolioId: number;
}
