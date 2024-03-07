import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AxiosRetryModule } from './modules/axios-retry/axios-retry.module';
import { KafkaModule } from './modules/kafka-retry/kafka.module';

@Module({
  imports: [AxiosRetryModule, KafkaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
