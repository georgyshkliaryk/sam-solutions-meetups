import { apiUrls } from "./../../constants";
import {
  IEditedMeetupToServer,
  ILoginData,
  ILoginResponse,
  IMeetupFromServer,
  IMeetupToServer,
  INetworkRepository,
  INewsFromServer,
  IParticipant,
} from "./../interfaces/INetworkRepository";
import axios from "axios";

export class NetworkRepository implements INetworkRepository {
  async getAllMeetups(): Promise<IMeetupFromServer[]> {
    const response = await axios.get(apiUrls.meetups);
    return await response.data;
  }

  async getAllNews(): Promise<INewsFromServer[]> {
    const response = await axios.get(apiUrls.news);
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

  async participateInMeetup(meetupId: string): Promise<IParticipant[]> {
    const response = await axios.post(
      `${apiUrls.meetups}/${meetupId}/participants`
    );
    return await response.data;
  }

  async stopParticipateInMeetup(meetupId: string): Promise<IParticipant[]> {
    const response = await axios.delete(
      `${apiUrls.meetups}/${meetupId}/participants`
    );
    return await response.data;
  }

  async getVotedUsersOfTheme(id: string): Promise<IParticipant[]> {
    const response = await axios.get(`${apiUrls.meetups}/${id}/votedusers`);
    return await response.data;
  }

  async voteForTheme(meetupId: string): Promise<IParticipant[]> {
    const response = await axios.post(
      `${apiUrls.meetups}/${meetupId}/votedusers`
    );
    return await response.data;
  }

  async unvoteForTheme(meetupId: string): Promise<IParticipant[]> {
    const response = await axios.delete(
      `${apiUrls.meetups}/${meetupId}/votedusers`
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

  async editMeetup(
    meetupData: IEditedMeetupToServer
  ): Promise<IMeetupFromServer> {
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
