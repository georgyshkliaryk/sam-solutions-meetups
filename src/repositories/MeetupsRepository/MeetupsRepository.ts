import {
  IEditedMeetup,
  IMeetup,
  IMeetupsRepository,
  INewMeetup,
} from "./../interfaces/IMeetupsRepository";
import {
  IEditedMeetupToServer,
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

  async getMeetupById(id: string): Promise<IMeetup> {
    const meetupFromServer = await this.networkRepository.getMeetupById(id);
    return this.parseMeetup(meetupFromServer);
  }

  async createMeetup(meetupData: INewMeetup): Promise<IMeetup> {
    const newMeetupForServer = this.parseMeetupForServer(meetupData);
    const response = await this.networkRepository.createMeetup(
      newMeetupForServer
    );
    return this.parseMeetup(response);
  }

  async editMeetup(meetupData: IEditedMeetup): Promise<void> {
    const editedMeetup = this.parseEditedMeetupForServer(meetupData);
    await this.networkRepository.editMeetup(editedMeetup);
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
      image: meetup.image,
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
      image: meetup.image,
    };
  }

  private parseEditedMeetupForServer(
    meetup: IEditedMeetup
  ): IEditedMeetupToServer {
    return {
      id: meetup.id,
      subject: meetup.title,
      excerpt: meetup.description,
      start: meetup.start,
      finish: meetup.finish,
      place: meetup.place,
      image: meetup.image,
    };
  }
}
