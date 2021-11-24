import { apiUrls } from "./../../constants";
import {
  IMeetupFromServer,
  INetworkRepository,
} from "./../interfaces/INetworkRepository";
import axios from "axios";

export class NetworkRepository implements INetworkRepository {
  async getAllMeetups(): Promise<IMeetupFromServer[]> {
    const response = await axios.get(apiUrls.meetups);
    return await response.data;
  }
}
