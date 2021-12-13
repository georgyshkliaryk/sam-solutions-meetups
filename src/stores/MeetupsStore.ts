import { NetworkRepository } from "./../repositories/NetworkRepository/NetworkRepository";
import { IParticipant } from "./../repositories/interfaces/INetworkRepository";
import {
  IEditedMeetup,
  IMeetup,
  INewMeetup,
} from "./../repositories/interfaces/IMeetupsRepository";
import { MeetupTypes } from "./../constants";
import { makeAutoObservable } from "mobx";
import { MeetupsRepository } from "../repositories/MeetupsRepository/MeetupsRepository";

export class MeetupsStore {
  meetups: IMeetup[] = [];
  participants: IParticipant[] | undefined = undefined;
  errorState = false;

  constructor(
    private readonly meetupsRepository: MeetupsRepository,
    private readonly networkRepository: NetworkRepository
  ) {
    makeAutoObservable(this);
  }

  async getAllMeetups(): Promise<void> {
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

  async getMeetupById(id: string): Promise<IMeetup | undefined> {
    this.errorState = false;
    try {
      const response = await this.meetupsRepository.getMeetupById(id);
      this.errorState = false;
      return response;
    } catch {
      this.errorState = true;
    }
  }

  resetErrorState(): void {
    this.errorState = false;
  }

  async createNewMeetup(meetupData: INewMeetup): Promise<void> {
    const newMeetup = await this.meetupsRepository.createMeetup(meetupData);
    this.meetups.push(newMeetup);
  }

  async editMeetup(meetupData: IEditedMeetup): Promise<void> {
    await this.meetupsRepository.editMeetup(meetupData);
  }

  async deleteMeetup(id: string) {
    await this.networkRepository.deleteMeetup(id);
    this.meetups = this.meetups.filter((m: IMeetup) => m.id !== id);
  }
}
