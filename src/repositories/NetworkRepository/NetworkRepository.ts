import { apiUrls } from "./../../constants";
import {
  IEditedMeetupToServer,
  ILoginData,
  ILoginResponse,
  IMeetupFromServer,
  IMeetupToServer,
  INetworkRepository,
  IParticipant,
} from "./../interfaces/INetworkRepository";
import axios from "axios";

export class NetworkRepository implements INetworkRepository {
  async getAllMeetups(): Promise<IMeetupFromServer[]> {
    const response = await axios.get(apiUrls.meetups);
    return await response.data;
  }

  async getMeetupById(id: string): Promise<IMeetupFromServer> {
    const response = await axios.get(`${apiUrls.meetups}/${id}`);
    return await response.data;
  }

  async getParticipantsOfMeetup(id: string): Promise<IParticipant[]> {
    const response = await axios.get(`${apiUrls.meetups}/${id}/participants`);
    return await response.data;
  }

  async participateInMeetup(
    meetupId: string,
    userId: string
  ): Promise<IParticipant[]> {
    const response = await axios.post(
      `${apiUrls.meetups}/${meetupId}/participants`,
      { id: userId }
    );
    return await response.data;
  }

  async createMeetup(meetupData: IMeetupToServer): Promise<IMeetupFromServer> {
    const response = await axios.post(apiUrls.meetups, meetupData);
    if (response.status !== 200) {
      throw new Error(response.data);
    }
    return await response.data;
  }

  async editMeetup(meetupData: IEditedMeetupToServer) {
    const response = await axios.put(apiUrls.meetups, meetupData);
    if (response.status !== 200) {
      throw new Error(response.data);
    }
    return await response.data;
  }

  async deleteMeetup(id: string) {
    const response = await axios.delete(`${apiUrls.meetups}/${id}`);
    if (response.status !== 200) {
      throw new Error(response.data);
    }
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

  async logout(): Promise<void> {
    const response = await axios.get(apiUrls.logout);
    if (response.status !== 200) {
      throw new Error(response.data);
    }
  }
}
