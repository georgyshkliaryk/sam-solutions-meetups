import {
  IMeetupFromServer,
  INetworkRepository,
} from "./../interfaces/INetworkRepository";
import axios from "axios";

class NetworkRepository implements INetworkRepository {
  all: IMeetupFromServer[] = [];
  async getAllMeetups(url: string): Promise<IMeetupFromServer[]> {
    const response = await axios.get(url);
    this.all = [...response.data];
    return await response.data;
  }
}

export default new NetworkRepository();
