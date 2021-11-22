import {
  IMeetup,
  IMeetupsRepository,
} from "./../interfaces/IMeetupsRepository";
import { IMeetupFromServer } from "./../interfaces/INetworkRepository";
import NetworkRepository from "../NetworkRepository/NetworkRepository";

class MeetupsRepository implements IMeetupsRepository {
  async getAllMeetups(): Promise<IMeetup[]> {
    const meetupsFromServer = await NetworkRepository.getAllMeetups();
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

export default new MeetupsRepository();
