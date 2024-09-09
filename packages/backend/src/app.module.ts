import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { ProducerModule } from './producer/producer.module';
import { configFactory, configValidation } from './config/configuration';
import { typeorm } from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantedCropsModule } from './planted-crops/planted-crops.module';
import { SummarizersModule } from './summarizers/summarizers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configFactory, typeorm],
      validationSchema: configValidation,
      envFilePath: !process.env.NODE_ENV
        ? '.env'
        : `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('typeorm'),
        migrations: [],
        migrationsRun: false,
      }),
    }),
    PlantedCropsModule,
    ProducerModule,
    SummarizersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
