import { makeAutoObservable } from "mobx";
import { NetworkRepository } from "../repositories/NetworkRepository/NetworkRepository";
import { NewsRepository } from "../repositories/NewsRepository/NewsRepository";
import { INews } from "./../repositories/interfaces/INewsRepository";
import { NotificationsStore } from "./NotificationsStore";

export class NewsStore {
  newsList: INews[] = [];
  errorState = false;

  constructor(
    private readonly meetupsRepository: NewsRepository,
    private readonly networkRepository: NetworkRepository,
    private readonly notificationsStore: NotificationsStore
  ) {
    makeAutoObservable(this);
  }

  async getAllNews(): Promise<void> {
    this.newsList = await this.meetupsRepository.getAllNews();
  }

  get news(): INews[] {
    if (this.newsList.length === 0) {
      this.getAllNews();
    }
    return this.newsList;
  }
}
