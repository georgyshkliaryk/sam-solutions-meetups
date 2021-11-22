interface IAuthor {
  name: string;
  surname: string;
}

export interface IMeetupFromServer {
  id: string;
  subject: string;
  excerpt: string;
  goCount?: number;
  author: IAuthor;
  status: string;
  start?: string;
  place?: string;
  isOver?: boolean;
}

export interface INetworkRepository {
  getAllMeetups: (url: string) => Promise<IMeetupFromServer[]>;
}
