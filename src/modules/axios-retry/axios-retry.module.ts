import { Module } from '@nestjs/common';
import { AxiosRetryService } from './axios-retry.service';
import { AxiosRetryController } from './axios-retry.controller';

@Module({
  providers: [AxiosRetryService],
  controllers: [AxiosRetryController]
})
export class AxiosRetryModule {}
