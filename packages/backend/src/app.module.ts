import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProducerModule } from './producer/producer.module';

@Module({
  imports: [ProducerModule],
  controllers: [AppController],
})
export class AppModule {}
