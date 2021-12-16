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
  image?: string | null;
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
  image?: string | null;
}

export interface IEditedMeetupToServer {
  id: string;
  subject?: string;
  excerpt?: string;
  start?: string | null;
  finish?: string | null;
  place?: string;
  image?: string | null;
  status?: string;
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
  getMeetupById: (id: string) => Promise<IMeetupFromServer>;
  getParticipantsOfMeetup: (id: string) => Promise<IParticipant[]>;
  participateInMeetup: (meetupId: string) => Promise<IParticipant[]>;
  stopParticipateInMeetup: (meetupId: string) => Promise<IParticipant[]>;
  createMeetup: (meetupData: IMeetupToServer) => Promise<IMeetupFromServer>;
  editMeetup: (meetupData: IEditedMeetupToServer) => Promise<IMeetupFromServer>;
  login: (loginData: ILoginData) => Promise<ILoginResponse>;
  loginWithCookies: () => Promise<ILoginResponse>;
  logout: () => void;
}
