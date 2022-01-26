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
import { t } from "i18next";

export class MeetupsStore {
  meetups: IMeetup[] = [];
  errorState = false;
  loadState = false;
  buttonInLoading = "";
  participantsMap = new Map<string, IParticipant[]>();
  votedUsersMap = new Map<string, IParticipant[]>();

  constructor(
    private readonly meetupsRepository: MeetupsRepository,
    private readonly networkRepository: NetworkRepository,
    private readonly notificationsStore: NotificationsStore
  ) {
    makeAutoObservable(this);
  }

  async getAllMeetups(): Promise<void> {
    this.loadState = true;
    this.meetups = await this.meetupsRepository.getAllMeetups();
    this.loadState = false;
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
    return this.meetups.filter((m: IMeetup) => {
      if (
        m.finish !== undefined &&
        new Date(m.finish).getTime() < new Date().getTime()
      ) {
        return true;
      }
      if (
        m.start !== undefined &&
        m.finish === undefined &&
        new Date(m.start).getTime() < new Date().getTime()
      ) {
        return true;
      }
      return false;
    });
  }

  async getMeetupById(id: string): Promise<IMeetup | undefined> {
    this.errorState = false;
    try {
      const response = await this.meetupsRepository.getMeetupById(id);
      this.errorState = false;
      return response;
    } catch {
      this.errorState = true;
      this.notificationsStore.setNotification({
        type: "error",
        title: t("notifications.titles.error"),
        description: t("notifications.descriptions.loadMeetupError"),
      });
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
        title: t("notifications.titles.success"),
        description: t("notifications.descriptions.createMeetupSuccess"),
      });
    } catch {
      this.notificationsStore.setNotification({
        type: "error",
        title: t("notifications.titles.error"),
        description: t("notifications.descriptions.createMeetupError"),
      });
    }
  }

  async editMeetup(meetupData: IEditedMeetup): Promise<void> {
    await this.meetupsRepository.editMeetup(meetupData);
  }

  async updateMeetup(meetupData: IEditedMeetup): Promise<void> {
    try {
      await this.meetupsRepository.editMeetup(meetupData);
      this.notificationsStore.setNotification({
        type: "success",
        title: t("notifications.titles.success"),
        description: t("notifications.descriptions.editMeetupSuccess"),
      });
    } catch {
      this.notificationsStore.setNotification({
        type: "error",
        title: t("notifications.titles.error"),
        description: t("notifications.descriptions.editMeetupError"),
      });
    }
  }

  async deleteMeetup(id: string): Promise<void> {
    try {
      await this.networkRepository.deleteMeetup(id);
      this.meetups = this.meetups.filter((m: IMeetup) => m.id !== id);
      this.notificationsStore.setNotification({
        type: "success",
        title: t("notifications.titles.success"),
        description: t("notifications.descriptions.deleteMeetupSuccess"),
      });
    } catch {
      this.notificationsStore.setNotification({
        type: "error",
        title: t("notifications.titles.error"),
        description: t("notifications.descriptions.deleteMeetupError"),
      });
    }
  }

  async approveTheme(id: string): Promise<void> {
    try {
      await this.editMeetup({
        id: id,
        status: MeetupTypes.DRAFT,
      });
      this.notificationsStore.setNotification({
        type: "success",
        title: t("notifications.titles.success"),
        description: t("notifications.descriptions.approveThemeSuccess"),
      });
    } catch {
      this.notificationsStore.setNotification({
        type: "error",
        title: t("notifications.titles.error"),
        description: t("notifications.descriptions.approveThemeError"),
      });
    }
  }

  async publishMeetup(id: string): Promise<void> {
    try {
      await this.editMeetup({
        id: id,
        status: MeetupTypes.CONFIRMED,
      });
      this.notificationsStore.setNotification({
        type: "success",
        title: t("notifications.titles.success"),
        description: t("notifications.descriptions.publishMeetupSuccess"),
      });
    } catch {
      this.notificationsStore.setNotification({
        type: "error",
        title: t("notifications.titles.error"),
        description: t("notifications.descriptions.publishMeetupError"),
      });
    }
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
    try {
      this.buttonInLoading = meetupId;
      await this.networkRepository.participateInMeetup(meetupId);
      await this.fetchParticipants(meetupId);
      this.buttonInLoading = "";
      this.notificationsStore.setNotification({
        type: "success",
        title: t("notifications.titles.success"),
        description: t("notifications.descriptions.participateInMeetupSuccess"),
      });
    } catch {
      this.buttonInLoading = "";
      this.notificationsStore.setNotification({
        type: "error",
        title: t("notifications.titles.error"),
        description: t("notifications.descriptions.participateInMeetupError"),
      });
    }
  }

  async voteForTheme(meetupId: string): Promise<void> {
    try {
      this.buttonInLoading = meetupId;
      await this.networkRepository.voteForTheme(meetupId);
      await this.fetchVotedUsers(meetupId);
      this.buttonInLoading = "";
      this.notificationsStore.setNotification({
        type: "success",
        title: t("notifications.titles.success"),
        description: t("notifications.descriptions.voteForThemeSuccess"),
      });
    } catch {
      this.buttonInLoading = "";
      this.notificationsStore.setNotification({
        type: "error",
        title: t("notifications.titles.error"),
        description: t("notifications.descriptions.voteForThemeError"),
      });
    }
  }

  async stopParticipateInMeetup(
    meetupId: string,
    userId: string
  ): Promise<void> {
    try {
      this.buttonInLoading = meetupId;
      await this.networkRepository.stopParticipateInMeetup(meetupId);
      this.participantsMap.set(
        meetupId,
        (await this.meetupsRepository.getParticipantsById(meetupId)).filter(
          (p: IParticipant) => p.id !== userId
        )
      );
      this.buttonInLoading = "";
      this.notificationsStore.setNotification({
        type: "warning",
        title: t("notifications.titles.error"),
        description: t(
          "notifications.descriptions.stopParticipateInMeetupSuccess"
        ),
      });
    } catch {
      this.buttonInLoading = "";
      this.notificationsStore.setNotification({
        type: "error",
        title: t("notifications.titles.error"),
        description: t(
          "notifications.descriptions.stopParticipateInMeetupError"
        ),
      });
    }
  }

  async unvoteForTheme(meetupId: string, userId: string): Promise<void> {
    try {
      this.buttonInLoading = meetupId;
      await this.networkRepository.unvoteForTheme(meetupId);
      this.votedUsersMap.set(
        meetupId,
        (await this.meetupsRepository.getVotedUsersById(meetupId)).filter(
          (p: IParticipant) => p.id !== userId
        )
      );
      this.buttonInLoading = "";
      this.notificationsStore.setNotification({
        type: "warning",
        title: t("notifications.titles.warning"),
        description: t("notifications.descriptions.unvoteForThemeSuccess"),
      });
    } catch {
      this.buttonInLoading = "";
      this.notificationsStore.setNotification({
        type: "error",
        title: t("notifications.titles.error"),
        description: t("notifications.descriptions.unvoteForThemeError"),
      });
    }
  }
}
