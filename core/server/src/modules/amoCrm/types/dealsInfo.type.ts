export type DealsInfoType = {
  _embedded: {
    leads: LeadType[];
  };
};

export type LeadType = {
  id: number;
  name: string;
  price: number;
  status_id: number;
  created_by: number;
  created_at: number;
  responsible_user_id: number;
};
