import {
  ILoginData,
  IUser,
} from "./../repositories/interfaces/INetworkRepository";
import { makeAutoObservable, toJS } from "mobx";
import { NetworkRepository } from "./../repositories/NetworkRepository/NetworkRepository";

export class AuthStore {
  user: IUser | {} = {};
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
      this.setAuthenticated(false);
      this.user = {};
    }
  }

  async login(loginData: ILoginData) {
    try {
      const loginResponse = await this.networkRepository.login(loginData);
      this.user = loginResponse.user;
      this.setAuthenticated(true);
    } catch (err) {
      this.setAuthenticated(false);
      this.user = {};
    }
  }

  async logout() {
    await this.networkRepository.logout();
    this.setAuthenticated(false);
    this.user = {};
  }

  private setAuthenticated(authenticated: boolean) {
    this.authenticated = authenticated;
  }

  isAuthenticated() {
    return this.authenticated;
  }
}
