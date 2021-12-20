import { NotificationsStore } from "./NotificationsStore";
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
  errorState = false;
  loadingState = false;
  participantsMap = new Map<string, IParticipant[]>();

  constructor(
    private readonly meetupsRepository: MeetupsRepository,
    private readonly networkRepository: NetworkRepository,
    private readonly notificationsStore: NotificationsStore
  ) {
    makeAutoObservable(this);
  }

  async getAllMeetups(): Promise<void> {
    this.meetups = await this.meetupsRepository.getAllMeetups();
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
    try {
      const newMeetup = await this.meetupsRepository.createMeetup(meetupData);
      this.meetups.push(newMeetup);
      this.notificationsStore.setNotification({
        type: "success",
        title: "Успех",
        description: "Митап успешно создан.",
      });
    } catch {
      this.notificationsStore.setNotification({
        type: "error",
        title: "Ошибка",
        description: "Ошибка при создании митапа.",
      });
    }
  }

  async editMeetup(meetupData: IEditedMeetup): Promise<void> {
    await this.meetupsRepository.editMeetup(meetupData);
  }

  async deleteMeetup(id: string) {
    await this.networkRepository.deleteMeetup(id);
    this.meetups = this.meetups.filter((m: IMeetup) => m.id !== id);
  }

  async approveTheme(id: string): Promise<void> {
    await this.editMeetup({
      id: id,
      status: MeetupTypes.DRAFT,
    });
  }

  async publishMeetup(id: string): Promise<void> {
    await this.editMeetup({
      id: id,
      status: MeetupTypes.CONFIRMED,
    });
  }

  async fetchParticipants(id: string) {
    this.participantsMap.set(
      id,
      await this.meetupsRepository.getParticipantsById(id)
    );
    return this.participantsMap;
  }

  async participateInMeetup(meetupId: string): Promise<void> {
    this.loadingState = true;
    await this.networkRepository.participateInMeetup(meetupId);
    await this.fetchParticipants(meetupId);
    this.loadingState = false;
  }

  async stopParticipateInMeetup(
    meetupId: string,
    userId: string
  ): Promise<void> {
    this.loadingState = true;
    await this.networkRepository.stopParticipateInMeetup(meetupId);
    this.participantsMap.set(
      meetupId,
      (await this.meetupsRepository.getParticipantsById(meetupId)).filter(
        (p: IParticipant) => p.id !== userId
      )
    );
    this.loadingState = false;
  }
}
