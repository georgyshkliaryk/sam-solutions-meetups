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
  image?: string | null;
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
  image?: string | null;
}

export interface IEditedMeetup {
  id: string;
  start?: string | null;
  finish?: string | null;
  title?: string;
  description?: string;
  place?: string;
  image?: string | null;
  status?: string;
}

export interface IMeetupsRepository {
  getAllMeetups: (allMeetups: IMeetupFromServer[]) => Promise<IMeetup[]>;
  getMeetupById: (id: string) => Promise<IMeetup>;
  createMeetup: (meetupData: INewMeetup) => Promise<IMeetup>;
  editMeetup: (meetupData: IEditedMeetup) => Promise<void>;
  getParticipantsById: (id: string) => Promise<IParticipant[]>;
  getVotedUsersById: (id: string) => Promise<IParticipant[]>;
}
