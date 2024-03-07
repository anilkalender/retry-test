import { Injectable, Logger } from '@nestjs/common';
import { Kafka, logLevel } from 'kafkajs';

@Injectable()
export class KafkaService {
  private readonly LOGGER = new Logger(KafkaService.name);

  private kafka: Kafka;
  private producer;

  constructor() {
    this.kafka = new Kafka({
      brokers: ['localhost:9092'],
      logLevel: logLevel.INFO,
    });

    this.producer = this.kafka.producer();
    this.init();
    this.listenToMessages();
  }

  async init() {
    await this.producer.connect();
  }

  async sendMessage(topic: string, message: string) {
    await this.producer.send({
      topic,
      messages: [{ value: message }],
    });
  }

  async listenToMessages() {
    const consumer = this.kafka.consumer({ groupId: 'test-group-2' });

    await consumer.connect();
    await consumer.subscribe({ topic: 'retry-test', fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        this.LOGGER.log({
          partition,
          offset: message.offset,
          value: message.value.toString(),
        });

        if (Math.random() < 1.8) {
          throw new Error('Simulated error occurred while processing message');
        }
      },
    });
  }
}
