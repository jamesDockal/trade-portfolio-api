import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioModule } from './portfolio/portfolio.module';
import { Portfolio } from './portfolio/entities/portfolio.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST', 'postgres'),
        port: parseInt(config.get('DB_PORT', '5432')),
        username: config.get('DB_USERNAME', 'admin'),
        password: config.get('DB_PASSWORD', '123'),
        database: config.get('DB_NAME', 'main'),
        entities: [Portfolio],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    PortfolioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
