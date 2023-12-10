import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { IAmoCrmProvider } from '../interfaces/amoCrmProvider.interface';
import {
  IRequestRefreshTokens,
  IRequestTokens,
} from '../interfaces/requestTokens.interface';
import { IResponseTokens } from '../interfaces/responseTokens.interface';

@Injectable()
export class AmoCrmProvider implements IAmoCrmProvider {
  constructor(private readonly httpService: HttpService) {}

  async refreshTokens(url: string, payload: IRequestRefreshTokens) {
    return this.baseTokensRequest<
      IRequestRefreshTokens,
      Pick<IResponseTokens, 'access_token' | 'refresh_token'>
    >(url, payload);
  }

  async getTokens(url: string, data: IRequestTokens): Promise<IResponseTokens> {
    return this.baseTokensRequest(url, data);
  }

  private async baseTokensRequest<DT, RT>(
    url: string,
    payload: DT,
  ): Promise<RT> {
    try {
      const { data } = await this.httpService
        .post<RT>(`${url}/oauth2/access_token`, payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .toPromise();

      return data;
    } catch (error) {
      console.dir(error);

      console.log('Что-то не так!');
      throw new BadRequestException(error.response.data);
    }
  }

  async getDealsInfo(url: string, access_token: string) {
    return this.baseGetRequests(`https://${url}/api/v4/leads`, access_token);
  }

  async getStatusesInfo(url: string, access_token: string) {
    return this.baseGetRequests(
      `https://${url}/api/v4/leads/pipelines`,
      access_token,
    );
  }

  async getUsersInfo(url: string, access_token: string) {
    return this.baseGetRequests(`https://${url}/api/v4/users`, access_token);
  }

  private async baseGetRequests(url: string, token: string) {
    const { data } = await this.httpService
      .get(url, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .toPromise();
    return data;
  }
}
