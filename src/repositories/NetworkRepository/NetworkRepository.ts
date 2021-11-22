import {
  IMeetupFromServer,
  INetworkRepository,
} from "./../interfaces/INetworkRepository";
import axios from "axios";

class NetworkRepository implements INetworkRepository {
  async getAllMeetups(url: string): Promise<IMeetupFromServer[]> {
    const response = await axios.get(url);
    return await response.data;
  }
}

export default new NetworkRepository();
