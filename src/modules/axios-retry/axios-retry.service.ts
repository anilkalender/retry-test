import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import axiosRetry from 'axios-retry';

@Injectable()
export class AxiosRetryService {
  private readonly LOGGER = new Logger(AxiosRetryService.name);

  private RETRY_COUNT = 0;

  public async sendPostRequest() {
    try {
      const client = axios.create();
      axiosRetry(client, {
        retries: 5,
        retryDelay: () => 30000,
        retryCondition: () => true,
      });

      const response = await client.post(
        'http://localhost:3000/api/retry/axios/',
      );
      this.LOGGER.log('Get Response:', response.data);
      return response.data;
    } catch (error) {
      this.LOGGER.error('POST Error:', error);
      throw error;
    }
  }

  public outgoingMock() {
    if (this.RETRY_COUNT < 3) {
      this.RETRY_COUNT++;
      throw new Error(
        `Since the retry count value is less than 3, send htpp 500 error. RETRY_COUNT : ${
          this.RETRY_COUNT - 1
        }`,
      );
    }

    return true;
  }
}
