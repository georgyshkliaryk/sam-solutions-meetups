import { makeAutoObservable } from "mobx";
import { NetworkRepository } from "../repositories/NetworkRepository/NetworkRepository";
import { NewsRepository } from "../repositories/NewsRepository/NewsRepository";
import { INews } from "./../repositories/interfaces/INewsRepository";
import { NotificationsStore } from "./NotificationsStore";

export class NewsStore {
  newsList: INews[] = [];
  errorState = false;

  constructor(
    private readonly newsRepository: NewsRepository,
    private readonly networkRepository: NetworkRepository,
    private readonly notificationsStore: NotificationsStore
  ) {
    makeAutoObservable(this);
  }

  async getAllNews(): Promise<void> {
    this.newsList = await this.newsRepository.getAllNews();
  }

  get news(): INews[] {
    if (this.newsList.length === 0) {
      this.getAllNews();
    }
    return this.newsList;
  }

  resetErrorState(): void {
    this.errorState = false;
  }

  async getArticleById(id: string): Promise<INews | undefined> {
    this.errorState = false;
    try {
      const response = await this.newsRepository.getArticleById(id);
      this.errorState = false;
      return response;
    } catch {
      this.errorState = true;
      //   this.notificationsStore.setNotification({
      //     type: "error",
      //     title: t("notifications.titles.error"),
      //     description: t("notifications.descriptions.loadMeetupError"),
      //   });
    }
  }
}
