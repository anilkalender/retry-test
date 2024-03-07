import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AxiosRetryService } from './axios-retry.service';

@Controller('retry/axios')
export class AxiosRetryController {
  constructor(private readonly retryService: AxiosRetryService) {}

  @Get()
  public async sendRequest() {
    const response = await this.retryService.sendPostRequest();
    return response;
  }

  @Post()
  public async outgoingMock() {
    let response;
    try {
      response = await this.retryService.outgoingMock();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return response;
  }
}
