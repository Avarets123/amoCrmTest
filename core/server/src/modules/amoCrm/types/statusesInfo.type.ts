export type StatusesInfoType = {
  _embedded: {
    pipelines: {
      id: number;
      name: string;
      _embedded: {
        statuses: StatusType[];
      };
    }[];
  };
};

export type StatusType = { id: number; name: string; color: string };
