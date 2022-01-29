import { t } from "i18next";
import { makeAutoObservable } from "mobx";
import { NetworkRepository } from "../repositories/NetworkRepository/NetworkRepository";
import { NewsRepository } from "../repositories/NewsRepository/NewsRepository";
import {
  IEditedArticle,
  INewArticle,
  INews,
} from "./../repositories/interfaces/INewsRepository";
import { NotificationsStore } from "./NotificationsStore";

export class NewsStore {
  newsList: INews[] = [];
  errorState = false;
  loadState = false;

  constructor(
    private readonly newsRepository: NewsRepository,
    private readonly networkRepository: NetworkRepository,
    private readonly notificationsStore: NotificationsStore
  ) {
    makeAutoObservable(this);
  }

  async getAllNews(): Promise<void> {
    this.loadState = true;
    this.newsList = await this.newsRepository.getAllNews();
    this.loadState = false;
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
      this.notificationsStore.setNotification({
        type: "error",
        title: t("notifications.titles.error"),
        description: t("notifications.descriptions.loadArticleError"),
      });
    }
  }

  async deleteArticle(id: string): Promise<void> {
    try {
      await this.networkRepository.deleteArticle(id);
      this.newsList = this.newsList.filter((m: INews) => m.id !== id);
      this.notificationsStore.setNotification({
        type: "success",
        title: t("notifications.titles.success"),
        description: t("notifications.descriptions.deleteArticleSuccess"),
      });
    } catch {
      this.notificationsStore.setNotification({
        type: "error",
        title: t("notifications.titles.error"),
        description: t("notifications.descriptions.deleteArticleError"),
      });
    }
  }

  async updateArticle(id: string, articleData: IEditedArticle): Promise<void> {
    try {
      await this.newsRepository.editArticle(id, articleData);
      this.notificationsStore.setNotification({
        type: "success",
        title: t("notifications.titles.success"),
        description: t("notifications.descriptions.editArticleSuccess"),
      });
    } catch {
      this.notificationsStore.setNotification({
        type: "error",
        title: t("notifications.titles.error"),
        description: t("notifications.descriptions.editArticleError"),
      });
    }
  }

  async createNewArticle(articleData: INewArticle): Promise<void> {
    try {
      const newArticle = await this.newsRepository.createArticle(articleData);
      this.newsList.push(newArticle);
      this.notificationsStore.setNotification({
        type: "success",
        title: t("notifications.titles.success"),
        description: t("notifications.descriptions.createArticleSuccess"),
      });
    } catch {
      this.notificationsStore.setNotification({
        type: "error",
        title: t("notifications.titles.error"),
        description: t("notifications.descriptions.createArticleError"),
      });
    }
  }
}
