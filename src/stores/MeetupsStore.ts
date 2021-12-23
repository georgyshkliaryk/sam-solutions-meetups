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
      this.notificationsStore.setNotification({
        type: "error",
        title: "Ошибка",
        description: "Не удалось загрузить митап.",
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

  async updateMeetup(meetupData: IEditedMeetup): Promise<void> {
    try {
      await this.meetupsRepository.editMeetup(meetupData);
      this.notificationsStore.setNotification({
        type: "success",
        title: "Успех",
        description: "Митап успешно изменен.",
      });
    } catch {
      this.notificationsStore.setNotification({
        type: "error",
        title: "Ошибка",
        description: "Не удалось изменить митап.",
      });
    }
  }

  async deleteMeetup(id: string): Promise<void> {
    try {
      await this.networkRepository.deleteMeetup(id);
      this.meetups = this.meetups.filter((m: IMeetup) => m.id !== id);
      this.notificationsStore.setNotification({
        type: "success",
        title: "Успех",
        description: "Митап успешно удален.",
      });
    } catch {
      this.notificationsStore.setNotification({
        type: "error",
        title: "Ошибка",
        description: "Не удалось удалить митап.",
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
        title: "Успех",
        description: "Тема одобрена.",
      });
    } catch {
      this.notificationsStore.setNotification({
        type: "success",
        title: "Успех",
        description: "Не удалось одобрить тему.",
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
        title: "Успех",
        description: "Митап опубликован.",
      });
    } catch {
      this.notificationsStore.setNotification({
        type: "error",
        title: "Ошибка",
        description: "Не удалось опубликовать митап.",
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
      this.loadingState = meetupId;
      await this.networkRepository.participateInMeetup(meetupId);
      await this.fetchParticipants(meetupId);
      this.loadingState = "";
      this.notificationsStore.setNotification({
        type: "success",
        title: "Успех",
        description: "Вы записались на митап.",
      });
    } catch {
      this.notificationsStore.setNotification({
        type: "error",
        title: "Ошибка",
        description: "Не удалось записаться на митап.",
      });
    }
  }

  async voteForTheme(meetupId: string): Promise<void> {
    try {
      this.loadingState = meetupId;
      await this.networkRepository.voteForTheme(meetupId);
      await this.fetchVotedUsers(meetupId);
      this.loadingState = "";
      this.notificationsStore.setNotification({
        type: "success",
        title: "Успех",
        description: "Вы поддержали тему.",
      });
    } catch {
      this.notificationsStore.setNotification({
        type: "error",
        title: "Ошибка",
        description: "Не удалось поддержать тему.",
      });
    }
  }

  async stopParticipateInMeetup(
    meetupId: string,
    userId: string
  ): Promise<void> {
    try {
      this.loadingState = meetupId;
      await this.networkRepository.stopParticipateInMeetup(meetupId);
      this.participantsMap.set(
        meetupId,
        (await this.meetupsRepository.getParticipantsById(meetupId)).filter(
          (p: IParticipant) => p.id !== userId
        )
      );
      this.loadingState = "";
      this.notificationsStore.setNotification({
        type: "warning",
        title: "Внимание",
        description: "Вы отказались от участия в митапе.",
      });
    } catch {
      this.notificationsStore.setNotification({
        type: "error",
        title: "Ошибка",
        description: "Не удалось отказаться от участия в митапе.",
      });
    }
  }

  async unvoteForTheme(meetupId: string, userId: string): Promise<void> {
    try {
      this.loadingState = meetupId;
      await this.networkRepository.unvoteForTheme(meetupId);
      this.votedUsersMap.set(
        meetupId,
        (await this.meetupsRepository.getVotedUsersById(meetupId)).filter(
          (p: IParticipant) => p.id !== userId
        )
      );
      this.loadingState = "";
      this.notificationsStore.setNotification({
        type: "warning",
        title: "Внимание",
        description: "Вы больше не поддерживаете тему.",
      });
    } catch {
      this.notificationsStore.setNotification({
        type: "error",
        title: "Ошибка",
        description: "Не удалось убрать голос с темы.",
      });
    }
  }
}
