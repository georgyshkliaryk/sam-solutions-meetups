import { IMeetupFromServer, IParticipant } from "./INetworkRepository";

export interface IMeetup {
  id: string;
  authorName: string;
  authorSurname?: string;
  speakers: IParticipant[];
  start?: string;
  finish?: string;
  title: string;
  description: string;
  place?: string;
  goCount: number;
  status?: string;
  isOver?: boolean;
  image?: string;
}

export interface IMeetupsRepository {
  getAllMeetups: (allMeetups: IMeetupFromServer[]) => Promise<IMeetup[]>;
  getParticipantsById: (id: string) => Promise<IParticipant[]>;
}
