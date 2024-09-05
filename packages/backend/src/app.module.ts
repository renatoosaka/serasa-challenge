import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { ProducerModule } from './producer/producer.module';
import { configFactory, configValidation } from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configFactory],
      validationSchema: configValidation,
      envFilePath: !process.env.NODE_ENV
        ? '.env'
        : `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get<string>('DATABASE_HOST'),
          port: configService.get<number>('DATABASE_POST'),
          username: configService.get<string>('DATABASE_USER'),
          password: configService.get<string>('DATABASE_PASS'),
          database: configService.get<string>('DATABASE_NAME'),
          entities: ['dist/**/*.entity{.ts,.js}'],
          synchronize: configService.get<boolean>('DATABASE_SYNC'),
        };
      },
    }),
    ProducerModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
