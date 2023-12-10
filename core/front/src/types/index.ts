export interface ILeads {
  id: number;
  name: string;
  price: number;
  creator: Creator;
  responsible_user: ResponsibleUser;
  status: Status;
  created_at: number;
}

export interface Creator {
  id: number;
  lang: string;
  name: string;
}

export interface ResponsibleUser {
  id: number;
  lang: string;
  name: string;
}

export interface Status {
  id: number;
  name: string;
  color: string;
}
