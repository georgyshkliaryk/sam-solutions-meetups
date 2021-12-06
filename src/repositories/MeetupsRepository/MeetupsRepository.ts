import {
  IMeetup,
  IMeetupsRepository,
  INewMeetup,
} from "./../interfaces/IMeetupsRepository";
import {
  IMeetupFromServer,
  IMeetupToServer,
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

  async createMeetup(meetupData: INewMeetup): Promise<IMeetup> {
    const newMeetupForServer = this.parseMeetupForServer(meetupData);
    const response = await this.networkRepository.createMeetup(
      newMeetupForServer
    );
    return this.parseMeetup(response);
  }

  async getParticipantsById(id: string): Promise<IParticipant[]> {
    return await this.networkRepository.getParticipantsOfMeetup(id);
  }

  private parseMeetup(meetup: IMeetupFromServer): IMeetup {
    return {
      id: meetup.id,
      title: meetup.subject,
      description: meetup.excerpt,
      authorId: meetup.author.id,
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

  private parseMeetupForServer(meetup: INewMeetup): IMeetupToServer {
    return {
      subject: meetup.title,
      excerpt: meetup.description,
      author: {
        id: meetup.authorId,
        name: meetup.authorName,
        surname: meetup.authorSurname,
      },
      speakers: meetup.speakers,
      start: meetup.start,
      finish: meetup.finish,
      place: meetup.place,
    };
  }
}
