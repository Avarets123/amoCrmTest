export type UsersInfoType = {
  _embedded: {
    users: UserType[];
  };
};

export type UserType = { id: number; name: string; lang: true };
