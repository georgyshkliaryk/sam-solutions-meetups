import {
  IMeetup,
  IMeetupsRepository,
} from "./../interfaces/IMeetupsRepository";
import { IMeetupFromServer } from "./../interfaces/INetworkRepository";
import { NetworkRepository } from "../NetworkRepository/NetworkRepository";

export class MeetupsRepository implements IMeetupsRepository {
  constructor(private readonly networkRepository: NetworkRepository) {
    this.networkRepository = networkRepository;
  }
  async getAllMeetups(): Promise<IMeetup[]> {
    const meetupsFromServer = await this.networkRepository.getAllMeetups();
    return meetupsFromServer.map(this.parseMeetup);
  }
  private parseMeetup(meetup: IMeetupFromServer): IMeetup {
    return {
      id: meetup.id,
      title: meetup.subject,
      description: meetup.excerpt,
      authorName: meetup.author.name,
      authorSurname: meetup.author.surname,
      goCount: meetup.goCount,
      start: meetup.start,
      place: meetup.place,
      status: meetup.status,
      isOver: meetup.isOver,
    };
  }
}
