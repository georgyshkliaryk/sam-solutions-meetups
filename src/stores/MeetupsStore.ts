import { IMeetup } from "./../repositories/interfaces/IMeetupsRepository";
import { MeetupTypes } from "./../constants";
import { makeAutoObservable } from "mobx";
import { MeetupsRepository } from "../repositories/MeetupsRepository/MeetupsRepository";

export class MeetupsStore {
  meetups: IMeetup[] = [];
  currentTheme: IMeetup | undefined = undefined;

  constructor(private readonly meetupsRepository: MeetupsRepository) {
    makeAutoObservable(this);
  }

  private async getAllMeetups() {
    this.meetups = [];
    this.meetups = await this.meetupsRepository.getAllMeetups();
  }

  get themes(): IMeetup[] {
    if (this.meetups.length === 0) {
      this.getAllMeetups();
    }
    return this.meetups.filter(
      (m: IMeetup) => m.status === MeetupTypes.REQUEST
    );
  }

  get drafts(): IMeetup[] {
    if (this.meetups.length === 0) {
      this.getAllMeetups();
    }
    return this.meetups.filter((m: IMeetup) => m.status === MeetupTypes.DRAFT);
  }

  get future(): IMeetup[] {
    if (this.meetups.length === 0) {
      this.getAllMeetups();
    }
    return this.meetups.filter(
      (m: IMeetup) => m.status === MeetupTypes.CONFIRMED
    );
  }

  get past(): IMeetup[] {
    if (this.meetups.length === 0) {
      this.getAllMeetups();
    }
    return this.meetups.filter((m: IMeetup) => m.isOver);
  }

  getMeetupById(id: string | undefined): void {
    this.currentTheme = this.meetups.find((m: IMeetup) => m.id === id);
  }

  get current(): IMeetup | undefined {
    if (this.meetups.length === 0) {
      this.getAllMeetups();
    }
    return this.currentTheme;
  }
}
