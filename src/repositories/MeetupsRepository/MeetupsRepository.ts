import {
  IMeetup,
  IMeetupsRepository,
} from "./../interfaces/IMeetupsRepository";
import {
  IMeetupFromServer,
  IParticipant,
} from "./../interfaces/INetworkRepository";
import { NetworkRepository } from "../NetworkRepository/NetworkRepository";

export class MeetupsRepository implements IMeetupsRepository {
  constructor(private readonly networkRepository: NetworkRepository) {
    this.networkRepository = networkRepository;
  }
  async getAllMeetups(): Promise<IMeetup[]> {
    const meetupsFromServer = await this.networkRepository.getAllMeetups();
    return meetupsFromServer.map(this.parseMeetup);
  }
  async getParticipantsById(id: string): Promise<IParticipant[]> {
    return await this.networkRepository.getParticipantsOfMeetup(id);
  }
  private parseMeetup(meetup: IMeetupFromServer): IMeetup {
    return {
      id: meetup.id,
      title: meetup.subject,
      description: meetup.excerpt,
      authorName: meetup.author.name,
      authorSurname: meetup.author.surname,
      speakers: meetup.speakers,
      goCount: meetup.goCount,
      start: meetup.start,
      finish: meetup.finish,
      place: meetup.place,
      status: meetup.status,
      isOver: meetup.isOver,
    };
  }
}
