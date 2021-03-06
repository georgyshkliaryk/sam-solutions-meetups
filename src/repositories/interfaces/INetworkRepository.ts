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

export interface INewsFromServer {
  id: string;
  publicationDate: string;
  title: string;
  text: string;
  image: string;
}

export interface INewsToServer {
  publicationDate: string;
  title: string;
  text: string;
  image: string | null;
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

export interface IEditedArticleToServer {
  id: string;
  title?: string;
  text?: string;
  image?: string | null;
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
  getAllNews: () => Promise<INewsFromServer[]>;
  getMeetupById: (id: string) => Promise<IMeetupFromServer>;
  getArticleById: (id: string) => Promise<INewsFromServer>;
  getParticipantsOfMeetup: (id: string) => Promise<IParticipant[]>;
  participateInMeetup: (meetupId: string) => Promise<IParticipant[]>;
  stopParticipateInMeetup: (meetupId: string) => Promise<IParticipant[]>;
  createMeetup: (meetupData: IMeetupToServer) => Promise<IMeetupFromServer>;
  editMeetup: (meetupData: IEditedMeetupToServer) => Promise<IMeetupFromServer>;
  editArticle: (
    id: string,
    articleData: IEditedArticleToServer
  ) => Promise<INewsFromServer>;
  login: (loginData: ILoginData) => Promise<ILoginResponse>;
  loginWithCookies: () => Promise<ILoginResponse>;
  logout: () => void;
}
