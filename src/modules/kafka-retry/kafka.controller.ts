import { Controller, Get } from '@nestjs/common';
import { KafkaService } from './kafka.service';

@Controller('retry/kafka')
export class KafkaController {
  constructor(private readonly kafkaService: KafkaService) {}
  @Get('message')
  async sendMessage() {
    const min = 1000;
    const max = 10000;
    const dcId = Math.floor(Math.random() * (max - min + 1)) + min;

    await this.kafkaService.sendMessage('retry-test', `{dcId:${dcId}}`);
    return 'Message sent to Kafka';
  }
}
