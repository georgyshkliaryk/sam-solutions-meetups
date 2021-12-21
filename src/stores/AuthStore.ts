import { NotificationsStore } from "./NotificationsStore";
import {
  ILoginData,
  IUser,
} from "./../repositories/interfaces/INetworkRepository";
import { makeAutoObservable } from "mobx";
import { NetworkRepository } from "./../repositories/NetworkRepository/NetworkRepository";

export class AuthStore {
  user: IUser | undefined = undefined;
  private authenticated = false;

  constructor(
    private readonly networkRepository: NetworkRepository,
    private readonly notificationsStore: NotificationsStore
  ) {
    makeAutoObservable(this);
    this.loginWithCookies();
  }

  private async loginWithCookies() {
    try {
      const response = await this.networkRepository.loginWithCookies();
      this.setAuthenticated(true);
      this.user = response.user;
    } catch (err) {
      this.resetAuth();
      this.notificationsStore.setNotification({
        type: "warning",
        title: "Внимание",
        description: "Данные для входа больше не дейстуют. Выполните вход.",
      });
    }
  }

  async login(loginData: ILoginData): Promise<void> {
    try {
      const loginResponse = await this.networkRepository.login(loginData);
      this.user = loginResponse.user;
      this.setAuthenticated(true);
      this.notificationsStore.setNotification({
        type: "success",
        title: "Успех",
        description: "Вход выполнен успешно.",
      });
    } catch {
      this.resetAuth();
      this.notificationsStore.setNotification({
        type: "error",
        title: "Ошибка",
        description: "Вход не выполнен.",
      });
    }
  }

  async logout(): Promise<void> {
    try {
      await this.networkRepository.logout();
      this.resetAuth();
      this.notificationsStore.setNotification({
        type: "info",
        title: "Инфо",
        description: "Выход выполнен успешно.",
      });
    } catch {
      this.notificationsStore.setNotification({
        type: "error",
        title: "Ошибка",
        description: "Не удалось выйти.",
      });
    }
  }

  private setAuthenticated(authenticated: boolean) {
    this.authenticated = authenticated;
  }

  get isAuthenticated(): boolean {
    return this.authenticated;
  }

  private resetAuth() {
    this.setAuthenticated(false);
    this.user = undefined;
  }
}
