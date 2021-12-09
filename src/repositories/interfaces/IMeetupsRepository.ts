import {
  IMeetupFromServer,
  IParticipant,
  ISpeaker,
} from "./INetworkRepository";

export interface IMeetup {
  id: string;
  authorId: string;
  authorName: string;
  authorSurname?: string;
  speakers: IParticipant[];
  start?: string;
  finish?: string;
  title: string;
  description: string;
  place?: string;
  goCount: number;
  status: string;
  isOver: boolean;
  image?: string;
}

export interface INewMeetup {
  authorId: string;
  authorName: string;
  authorSurname?: string;
  speakers: ISpeaker[];
  start?: string;
  finish?: string;
  title: string;
  description: string;
  place?: string;
  image?: string;
}

export interface IEditedMeetup {
  id: string;
  start?: string | null;
  finish?: string | null;
  title?: string;
  description?: string;
  place?: string;
  image?: string;
}

export interface IMeetupsRepository {
  getAllMeetups: (allMeetups: IMeetupFromServer[]) => Promise<IMeetup[]>;
  createMeetup: (meetupData: INewMeetup) => Promise<IMeetup>;
  getParticipantsById: (id: string) => Promise<IParticipant[]>;
}
