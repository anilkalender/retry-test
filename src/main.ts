import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { KafkaService } from './modules/kafka-retry/kafka.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const kafkaService = app.get(KafkaService);
  await kafkaService.listenToMessages();
  app.setGlobalPrefix('/api');
  await app.listen(3010);
}
bootstrap();
