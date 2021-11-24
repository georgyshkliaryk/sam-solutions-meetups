interface IAuthor {
  name: string;
  surname: string;
}

export interface IMeetupFromServer {
  id: string;
  subject: string;
  excerpt: string;
  goCount: number;
  author: IAuthor;
  status: string;
  start?: string;
  place?: string;
  isOver?: boolean;
}

export interface IUser {
  id: string;
  name: string;
  password: string;
  surname: string;
  post?: string;
  roles?: string;
}

export interface ILoginResponse {
  user: IUser;
}

export interface ILoginData {
  username: string;
  password: string;
}

export interface INetworkRepository {
  getAllMeetups: () => Promise<IMeetupFromServer[]>;
  login: (loginData: ILoginData) => Promise<ILoginResponse>;
}
