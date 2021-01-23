export interface UserBrief {
  userId: string;
  name: string;
}

export interface User {
  __typename:    string;
  ref:           string;
  name:          string;
  userId:        string;
  weights:       Weights;
  currentWeight: number;
  initialWeight: number;
}

export interface Weights {
  __typename: string;
  data:       Datum[];
}

export interface Datum {
  __typename: string;
  weight:     number;
  date:       Date;
}