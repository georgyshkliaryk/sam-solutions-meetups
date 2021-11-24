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
  async loginAttempt(loginData: ILoginData): Promise<ILoginResponse> {
    const response = await axios.post(apiUrls.login, loginData);
    console.log(response.status);
    if (response.status !== 200) {
      throw new Error(response.data);
    }
    console.log(response.data);
    return await response.data;
  }
}
