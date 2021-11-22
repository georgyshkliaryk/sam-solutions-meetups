import {
  IMeetup,
  IMeetupsRepository,
} from "./../interfaces/IMeetupsRepository";
import { IMeetupFromServer } from "./../interfaces/INetworkRepository";
import { apiUrls } from "./../../constants";
import NetworkRepository from "../NetworkRepository/NetworkRepository";

class MeetupsRepository implements IMeetupsRepository {
  parsedMeetups: IMeetup[] = [];
  async parseAllMeetups(): Promise<IMeetup[]> {
    (await NetworkRepository.getAllMeetups(apiUrls.meetups)).map(
      (m: IMeetupFromServer) => {
        return this.parsedMeetups.push({
          id: m.id,
          title: m.subject,
          description: m.excerpt,
          authorName: m.author.name,
          authorSurname: m.author.surname,
          goCount: m.goCount,
          start: m.start,
          place: m.place,
          status: m.status,
          isOver: m.isOver,
        });
      }
    );
    return this.parsedMeetups;
  }
}

export default new MeetupsRepository();
