import { makeAutoObservable } from "mobx";
import { meetupTypes } from "../constants";
import { IMeetup } from "../repositories/interfaces/IMeetupsRepository";
import MeetupsRepository from "../repositories/MeetupsRepository/MeetupsRepository";

class MeetupsStore {
  themes: IMeetup[] = [];
  drafts: IMeetup[] = [];
  future: IMeetup[] = [];
  past: IMeetup[] = [];

  constructor() {
    makeAutoObservable(this);
    MeetupsRepository.parseAllMeetups();
  }

  getMeetupsThemes() {
    this.themes = [];
    const filteredMeetups: IMeetup[] = MeetupsRepository.parsedMeetups.filter(
      (m: IMeetup) => m.status === meetupTypes.REQUEST
    );
    this.themes = [...filteredMeetups];
  }

  getMeetupsDrafts() {
    this.drafts = [];
    const filteredMeetups: IMeetup[] = MeetupsRepository.parsedMeetups.filter(
      (m: IMeetup) => m.status === meetupTypes.DRAFT
    );
    this.drafts = [...filteredMeetups];
  }

  getMeetupsFuture() {
    this.future = [];
    const filteredMeetups: IMeetup[] = MeetupsRepository.parsedMeetups.filter(
      (m: IMeetup) => m.status === meetupTypes.CONFIRMED
    );
    this.future = [...filteredMeetups];
  }

  getMeetupsPast() {
    this.past = [];
    const filteredMeetups: IMeetup[] = MeetupsRepository.parsedMeetups.filter(
      (m: IMeetup) => m.isOver
    );
    this.past = [...filteredMeetups];
  }
}

export default new MeetupsStore();
