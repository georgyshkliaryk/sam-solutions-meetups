interface IAuthor {
  id: string;
  name: string;
  surname?: string;
}

export interface IMeetupFromServer {
  id: string;
  subject: string;
  excerpt: string;
  goCount: number;
  author: IAuthor;
  speakers: IParticipant[];
  status: string;
  start?: string;
  finish?: string;
  place?: string;
  isOver: boolean;
  image?: string;
}

export interface IMeetupToServer {
  subject: string;
  excerpt: string;
  goCount?: number;
  author: IAuthor;
  speakers: ISpeaker[];
  status?: string;
  start?: string;
  finish?: string;
  place?: string;
  isOver?: boolean;
  image?: string;
}

export interface IParticipant {
  id: string;
  name: string;
  surname?: string;
}

export interface ISpeaker {
  id?: string;
  name: string;
  surname?: string;
}

export interface IUser {
  id: string;
  name: string;
  surname?: string;
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
  getParticipantsOfMeetup: (id: string) => Promise<IParticipant[]>;
  createMeetup: (meetupData: IMeetupToServer) => Promise<IMeetupFromServer>;
  login: (loginData: ILoginData) => Promise<ILoginResponse>;
  loginWithCookies: () => Promise<ILoginResponse>;
  logout: () => void;
}
