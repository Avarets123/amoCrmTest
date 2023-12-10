import { ILeads } from "@/types";

type ResDataType<T> = {
  status: number;
  data?: T;
};

enum MethodsEnum {
  GET = "GET",
}

const request = async <RT>(
  url: string,
  method: MethodsEnum,
  body?: unknown
) => {
  const res = await fetch(url, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {},
  });

  const { status } = res;

  const resData: ResDataType<RT> = {
    status,
  };

  if (status != 200) {
    return resData;
  }

  resData.data = (await res.json()) as RT;

  return resData;
};

const serverUrl = "http://localhost:4000";

export const getLeads = () =>
  request<ILeads[]>(`${serverUrl}/leads`, MethodsEnum.GET);
