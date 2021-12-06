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
  participants: IParticipant[] | undefined = undefined;
  errorState = false;

  constructor(private readonly meetupsRepository: MeetupsRepository) {
    makeAutoObservable(this);
  }

  async getAllMeetups(): Promise<void> {
    this.meetups = [];
    this.meetups = await this.meetupsRepository.getAllMeetups();
  }

  private async getParticipantsById(id: string): Promise<void> {
    this.participants = undefined;
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

  async getMeetupById(id: string): Promise<void> {
    this.errorState = false;
    if (this.meetups.length === 0) {
      await this.getAllMeetups();
    }
    this.currentMeetup = this.meetups.find((m: IMeetup) => m.id === id);
    if (this.currentMeetup === undefined) {
      this.errorState = true;
    } else {
      this.errorState = false;
    }
  }

  resetErrorState() {
    this.errorState = false;
  }

  get current(): IMeetup | undefined {
    return this.currentMeetup;
  }

  async createNewMeetup(meetupData: INewMeetup): Promise<void> {
    const newMeetup = await this.meetupsRepository.createMeetup(meetupData);
    this.meetups.push(newMeetup);
  }
}
