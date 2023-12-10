import { BadRequestException, Injectable } from '@nestjs/common';
import { AmoCrmProvider } from '../infrastructure/amoCrm.provider';
import { RedirectQueryDto } from '../dto/redirectQuery.dto';
import {
  IRequestRefreshTokens,
  IRequestTokens,
} from '../interfaces/requestTokens.interface';
import { CacheService } from 'src/infrastructures/cache/cache.service';
import { AUTH_DATA_KEY, TOKEN_EXPIRED_MSG } from '../constants';
import { AuthCacheDataType } from '../types/cacheData.type';
import { UserType, UsersInfoType } from '../types/usersInfo.type';
import { StatusType, StatusesInfoType } from '../types/statusesInfo.type';
import { DealsInfoType, LeadType } from '../types/dealsInfo.type';
import { makeMapFromArray } from '../utils';

const client_secret =
  'QP8NdpsS4BltMxFVGmxyQgyvczyZuJb9JuyfkaCAKzHE6sxfvEwaCFUB2Y67wHps';

const integrationId = '60cedfe0-be3c-4644-91ab-11570a1459cb';

@Injectable()
export class AmoCrmService {
  constructor(
    private amoCrmProvider: AmoCrmProvider,
    private readonly cachService: CacheService,
  ) {}

  async getAllInfo() {
    const authData = await this.cachService.get<AuthCacheDataType>(
      AUTH_DATA_KEY,
    );

    try {
      const { access_token, request_url } = authData;

      let [deals, users, statuses]: [
        DealsInfoType | LeadType[],
        UsersInfoType | UserType[],
        StatusesInfoType | StatusType[],
      ] = await Promise.all([
        this.amoCrmProvider.getDealsInfo(request_url, access_token),
        this.amoCrmProvider.getUsersInfo(request_url, access_token),
        this.amoCrmProvider.getStatusesInfo(request_url, access_token),
      ]);

      deals = this.mapDealsInfo(deals as DealsInfoType);
      users = this.mapUsersInfo(users as UsersInfoType);
      statuses = this.mapStatusesInfo(statuses as StatusesInfoType);

      const statusesMap = makeMapFromArray(statuses);

      const usersMap = makeMapFromArray(users);

      return deals.map((el) => {
        const {
          name,
          id,
          created_by,
          price,
          status_id,
          responsible_user_id,
          created_at,
        } = el;
        return {
          id,
          name,
          price,
          creator: usersMap.get(created_by),
          responsible_user: usersMap.get(responsible_user_id),
          status: statusesMap.get(status_id),
          created_at,
        };
      });
    } catch (error) {
      const errMsg = error?.response?.data?.hint;

      if (errMsg === TOKEN_EXPIRED_MSG) {
        await this.refreshTokens(authData);
        return this.getAllInfo();
      }

      console.log('Что-то не так!');
      throw new BadRequestException(error);
    }
  }

  private mapUsersInfo(users: UsersInfoType) {
    return users._embedded.users.map(({ id, lang, name }) => ({
      id,
      lang,
      name,
    }));
  }

  private mapDealsInfo(deals: DealsInfoType): LeadType[] {
    return deals._embedded.leads.map(
      ({
        created_at,
        created_by,
        id,
        name,
        price,
        status_id,
        responsible_user_id,
      }) => ({
        id,
        name,
        price,
        status_id,
        created_by,
        created_at,
        responsible_user_id,
      }),
    );
  }

  private mapStatusesInfo(statuses: StatusesInfoType): StatusType[] {
    return statuses._embedded.pipelines.reduce((ac, el) => {
      ac = [
        ...ac,
        ...el._embedded.statuses.map(({ id, name, color }) => ({
          id,
          name,
          color,
        })),
      ];
      return ac;
    }, []);
  }

  async refreshTokens(data: AuthCacheDataType) {
    try {
      const { client_id, request_url, refresh_token } = data;

      const grant_type = 'refresh_token';

      const payload: IRequestRefreshTokens = {
        client_id,
        refresh_token,
        request_url,
        client_secret,
        grant_type,
      };

      const res = await this.amoCrmProvider.refreshTokens(
        `https://${request_url}`,
        payload,
      );

      data.access_token = res.access_token;
      data.refresh_token = res.refresh_token;

      await this.cachService.set(AUTH_DATA_KEY, data);

      return true;
    } catch (error) {
      console.log(error);
      console.log('Что-то не так!');
      return false;
    }
  }

  async receiveTokens(dto: RedirectQueryDto) {
    const { client_id, code, referer: request_url } = dto;

    const grant_type = 'authorization_code';

    const payload: IRequestTokens = {
      client_id,
      code,
      request_url,
      client_secret,
      redirect_uri: 'http://localhost:4000/tokens',
      grant_type,
    };

    const { access_token, refresh_token, token_type } =
      await this.amoCrmProvider.getTokens(`https://${request_url}`, payload);

    await this.cachService.set<AuthCacheDataType>(AUTH_DATA_KEY, {
      access_token,
      refresh_token,
      request_url,
      token_type,
      client_id,
    });
  }
}
