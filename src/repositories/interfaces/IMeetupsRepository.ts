import { IMeetupFromServer } from "./INetworkRepository";

export interface IMeetup {
  id: string;
  authorName: string;
  authorSurname: string;
  start?: string;
  title: string;
  description: string;
  place?: string;
  goCount?: number;
  status?: string;
  isOver?: boolean;
}

export interface IMeetupsRepository {
  // allMeetups: IMeetupFromServer[];
  // getMeetupsThemes: () => IMeetup[];
  // getMeetupsDrafts: () => IMeetup[];
  // getMeetupsFuture: () => IMeetup[];
  // getMeetupsPast: () => IMeetup[];
  parseAllMeetups: (allMeetups: IMeetupFromServer[]) => Promise<IMeetup[]>;
}
