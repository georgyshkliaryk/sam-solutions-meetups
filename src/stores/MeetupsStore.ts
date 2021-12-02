import { IParticipant } from "./../repositories/interfaces/INetworkRepository";
import {
  IMeetup,
  INewMeetup,
} from "./../repositories/interfaces/IMeetupsRepository";
import { MeetupTypes } from "./../constants";
import { makeAutoObservable } from "mobx";
import { MeetupsRepository } from "../repositories/MeetupsRepository/MeetupsRepository";

export class MeetupsStore {
  meetups: IMeetup[] = [];
  currentMeetup: IMeetup | undefined = undefined;
  participants: IParticipant[] = [];
  //error state

  constructor(private readonly meetupsRepository: MeetupsRepository) {
    makeAutoObservable(this);
  }

  async getAllMeetups(): Promise<void> {
    this.meetups = [];
    this.meetups = await this.meetupsRepository.getAllMeetups();
  }

  private async getParticipantsById(id: string): Promise<void> {
    this.participants = await this.meetupsRepository.getParticipantsById(id);
  }

  get themes(): IMeetup[] {
    if (this.meetups.length === 0) {
      this.getAllMeetups();
    }
    return this.meetups.filter(
      (m: IMeetup) => m.status === MeetupTypes.REQUEST && !m.isOver
    );
  }

  get drafts(): IMeetup[] {
    if (this.meetups.length === 0) {
      this.getAllMeetups();
    }
    return this.meetups.filter(
      (m: IMeetup) => m.status === MeetupTypes.DRAFT && !m.isOver
    );
  }

  get future(): IMeetup[] {
    if (this.meetups.length === 0) {
      this.getAllMeetups();
    }
    return this.meetups.filter(
      (m: IMeetup) => m.status === MeetupTypes.CONFIRMED && !m.isOver
    );
  }

  get past(): IMeetup[] {
    if (this.meetups.length === 0) {
      this.getAllMeetups();
    }
    return this.meetups.filter((m: IMeetup) => m.isOver);
  }

  getParticipantsList(id: string): void {
    this.getParticipantsById(id);
  }

  getMeetupById(id: string): void {
    this.currentMeetup = this.meetups.find((m: IMeetup) => m.id === id);
  }

  get current(): IMeetup | undefined {
    if (this.meetups.length === 0) {
      this.getAllMeetups();
    }
    return this.currentMeetup;
  }

  async createNewMeetup(meetupData: INewMeetup): Promise<void> {
    if (this.meetups.length === 0) {
      await this.getAllMeetups();
    }
    const newMeetup = await this.meetupsRepository.createMeetup(meetupData);
    this.meetups.push(newMeetup);
  }
}
