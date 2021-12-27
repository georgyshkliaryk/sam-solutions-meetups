import { NotificationsStore } from "./NotificationsStore";
import {
  ILoginData,
  IUser,
} from "./../repositories/interfaces/INetworkRepository";
import { makeAutoObservable } from "mobx";
import { NetworkRepository } from "./../repositories/NetworkRepository/NetworkRepository";

import { t } from "i18next";

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
        title: t("notifications.titles.warning"),
        description: t("notifications.descriptions.auth.loginExpired"),
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
        title: t("notifications.titles.success"),
        description: t("notifications.descriptions.auth.loginSuccess"),
      });
    } catch {
      this.resetAuth();
      this.notificationsStore.setNotification({
        type: "error",
        title: t("notifications.titles.error"),
        description: t("notifications.descriptions.auth.loginError"),
      });
    }
  }

  async logout(): Promise<void> {
    try {
      await this.networkRepository.logout();
      this.resetAuth();
      this.notificationsStore.setNotification({
        type: "info",
        title: t("notifications.titles.info"),
        description: t("notifications.descriptions.auth.logoutSuccess"),
      });
    } catch {
      this.notificationsStore.setNotification({
        type: "error",
        title: t("notifications.titles.error"),
        description: t("notifications.descriptions.auth.logoutError"),
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
