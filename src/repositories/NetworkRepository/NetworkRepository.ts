import { apiUrls } from "./../../constants";
import {
  ILoginData,
  ILoginResponse,
  IMeetupFromServer,
  INetworkRepository,
} from "./../interfaces/INetworkRepository";
import axios from "axios";

export class NetworkRepository implements INetworkRepository {
  async getAllMeetups(): Promise<IMeetupFromServer[]> {
    const response = await axios.get(apiUrls.meetups);
    return await response.data;
  }
  async login(loginData: ILoginData): Promise<ILoginResponse> {
    const response = await axios.post(apiUrls.login, loginData);
    if (response.status !== 200) {
      throw new Error(response.data);
    }
    return await response.data;
  }
  async loginWithCookies(): Promise<ILoginResponse> {
    const response = await axios.get(apiUrls.login);
    if (response.status !== 200) {
      throw new Error(response.data);
    }
    return await response.data;
  }
  async logout() {
    const response = await axios.get(apiUrls.logout);
    if (response.status !== 200) {
      throw new Error(response.data);
    }
  }
}
