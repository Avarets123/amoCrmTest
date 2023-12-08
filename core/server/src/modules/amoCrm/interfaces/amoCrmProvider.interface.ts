import { DealsInfoType } from '../types/dealsInfo.type';
import { StatusesInfoType } from '../types/statusesInfo.type';
import { UsersInfoType } from '../types/usersInfo.type';
import { IResponseTokens } from './responseTokens.interface';

type getInfoFnType<T = any> = (url: string, token: string) => Promise<T>;
type getTokensFnType<RT> = (...args: unknown[]) => Promise<RT>;

export interface IAmoCrmProvider {
  getTokens: getTokensFnType<IResponseTokens>;
  refreshTokens: getTokensFnType<
    Pick<IResponseTokens, 'access_token' | 'refresh_token'>
  >;
  getStatusesInfo: getInfoFnType<StatusesInfoType>;
  getUsersInfo: getInfoFnType<UsersInfoType>;
  getDealsInfo: getInfoFnType<DealsInfoType>;
}
