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
  loadingState = "";
  participantsMap = new Map<string, IParticipant[]>();
  votedUsersMap = new Map<string, IParticipant[]>();

  constructor(
    private readonly meetupsRepository: MeetupsRepository,
    private readonly networkRepository: NetworkRepository
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
    const newMeetup = await this.meetupsRepository.createMeetup(meetupData);
    this.meetups.push(newMeetup);
  }

  async editMeetup(meetupData: IEditedMeetup): Promise<void> {
    await this.meetupsRepository.editMeetup(meetupData);
  }

  async deleteMeetup(id: string): Promise<void> {
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

  async fetchParticipants(id: string): Promise<Map<string, IParticipant[]>> {
    this.participantsMap.set(
      id,
      await this.meetupsRepository.getParticipantsById(id)
    );
    return this.participantsMap;
  }

  async fetchVotedUsers(id: string): Promise<Map<string, IParticipant[]>> {
    this.votedUsersMap.set(
      id,
      await this.meetupsRepository.getVotedUsersById(id)
    );
    return this.votedUsersMap;
  }

  async participateInMeetup(meetupId: string): Promise<void> {
    this.loadingState = meetupId;
    await this.networkRepository.participateInMeetup(meetupId);
    await this.fetchParticipants(meetupId);
    this.loadingState = "";
  }

  async voteForTheme(meetupId: string): Promise<void> {
    this.loadingState = meetupId;
    await this.networkRepository.voteForTheme(meetupId);
    await this.fetchVotedUsers(meetupId);
    this.loadingState = "";
  }

  async stopParticipateInMeetup(
    meetupId: string,
    userId: string
  ): Promise<void> {
    this.loadingState = meetupId;
    await this.networkRepository.stopParticipateInMeetup(meetupId);
    this.participantsMap.set(
      meetupId,
      (await this.meetupsRepository.getParticipantsById(meetupId)).filter(
        (p: IParticipant) => p.id !== userId
      )
    );
    this.loadingState = "";
  }

  async unvoteForTheme(meetupId: string, userId: string): Promise<void> {
    this.loadingState = meetupId;
    await this.networkRepository.unvoteForTheme(meetupId);
    this.votedUsersMap.set(
      meetupId,
      (await this.meetupsRepository.getVotedUsersById(meetupId)).filter(
        (p: IParticipant) => p.id !== userId
      )
    );
    this.loadingState = "";
  }
}
