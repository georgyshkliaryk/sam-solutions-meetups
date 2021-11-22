import { IMeetupsRepository } from "./../interfaces/IMeetupsRepository";
import { IMeetupFromServer } from "./../interfaces/INetworkRepository";
import { apiUrls, meetupTypes } from "./../../constants";
import NetworkRepository from "../NetworkRepository/NetworkRepository";
import MeetupsStore from "../../stores/MeetupsStore";

class MeetupsRepository implements IMeetupsRepository {
  allMeetups: IMeetupFromServer[] = [];
  constructor() {
    NetworkRepository.getAllMeetups(apiUrls.meetups);
  }
  getMeetupsThemes() {
    MeetupsStore.themes = [];
    NetworkRepository.all
      .filter((m: IMeetupFromServer) => m.status === meetupTypes.REQUEST)
      .map((m: IMeetupFromServer) => {
        return MeetupsStore.themes.push({
          id: m.id,
          title: m.subject,
          description: m.excerpt,
          authorName: m.author.name,
          authorSurname: m.author.surname,
          goCount: m.goCount,
        });
      });
  }
  getMeetupsDrafts() {
    MeetupsStore.drafts = [];
    NetworkRepository.all
      .filter((m: IMeetupFromServer) => m.status === meetupTypes.DRAFT)
      .map((m: IMeetupFromServer) => {
        return MeetupsStore.drafts.push({
          id: m.id,
          title: m.subject,
          description: m.excerpt,
          authorName: m.author.name,
          authorSurname: m.author.surname,
          start: m.start,
          place: m.place,
        });
      });
  }
  getMeetupsFuture() {
    MeetupsStore.future = [];
    NetworkRepository.all
      .filter((m: IMeetupFromServer) => m.status === meetupTypes.CONFIRMED)
      .map((m: IMeetupFromServer) => {
        return MeetupsStore.future.push({
          id: m.id,
          title: m.subject,
          description: m.excerpt,
          authorName: m.author.name,
          authorSurname: m.author.surname,
          start: m.start,
          place: m.place,
        });
      });
  }
  getMeetupsPast() {
    MeetupsStore.future = [];
    NetworkRepository.all
      .filter((m: IMeetupFromServer) => m.isOver === meetupTypes.isOver)
      .map((m: IMeetupFromServer) => {
        return MeetupsStore.future.push({
          id: m.id,
          title: m.subject,
          description: m.excerpt,
          authorName: m.author.name,
          authorSurname: m.author.surname,
          start: m.start,
          place: m.place,
        });
      });
  }
}

export default new MeetupsRepository();
