import {
  ILoginData,
  IUser,
} from "./../repositories/interfaces/INetworkRepository";
import { makeAutoObservable } from "mobx";
import { NetworkRepository } from "./../repositories/NetworkRepository/NetworkRepository";

export class AuthStore {
  user: IUser | undefined = undefined;
  private authenticated = false;

  constructor(private readonly networkRepository: NetworkRepository) {
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
    }
  }

  async login(loginData: ILoginData) {
    try {
      const loginResponse = await this.networkRepository.login(loginData);
      this.user = loginResponse.user;
      this.setAuthenticated(true);
    } catch (err) {
      this.resetAuth();
    }
  }

  async logout() {
    await this.networkRepository.logout();
    this.resetAuth();
  }

  private setAuthenticated(authenticated: boolean) {
    this.authenticated = authenticated;
  }

  get isAuthenticated() {
    return this.authenticated;
  }

  private resetAuth() {
    this.setAuthenticated(false);
    this.user = undefined;
  }
}
