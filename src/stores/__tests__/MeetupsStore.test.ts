import NetworkRepository from "../../repositories/NetworkRepository/NetworkRepository";
import { apiUrls } from "./../../constants";
import { IMeetupFromServer } from "./../../repositories/interfaces/INetworkRepository";
import MeetupsStore from "../MeetupsStore";
import axios from "axios";
const mockedAxios = axios as jest.Mocked<typeof axios>;

test("Initial state", () => {
  expect(MeetupsStore.drafts.length).toEqual(0);
  expect(MeetupsStore.themes.length).toEqual(0);
  expect(MeetupsStore.past.length).toEqual(0);
  expect(MeetupsStore.future.length).toEqual(0);
  expect(MeetupsStore.meetups.length).toEqual(0);
});

jest.mock("axios");

describe("Fetch meetups", () => {
  it("should return meetups list", async () => {
    // given
    const testMeetups: IMeetupFromServer[] = [
      {
        id: "2de0306f-a712-4078-b1f0-b223c2f4246b",
        start: "2022-06-09T23:35:47.068Z",
        author: {
          name: "employee",
          surname: "Gerlach",
        },
        subject: "Reverse-engineered even-keeled standardization",
        excerpt:
          "Nemo pariatur dolores ut vero velit non. Quidem temporibus quod nihil amet recusandae atque provident voluptatum iste. Aut architecto cum sit rerum aliquam maxime. Ratione voluptate optio id molestias quia quidem ipsam. Eius voluptatem quia dolores enim assumenda. Consequuntur cupiditate error earum hic est numquam vero.",
        place: "630 Goyette Causeway",
        goCount: 64,
        status: "DRAFT",
        isOver: false,
      },
      {
        id: "234c96f4-f156-47f0-93fd-912c89dc4884",
        start: "2022-08-22T01:44:16.955Z",
        author: {
          name: "Lavern",
          surname: "Gerlach",
        },
        subject: "Universal real-time info-mediaries",
        excerpt:
          "Quae commodi qui. Voluptas et totam consectetur aut. Dolor fugiat soluta aliquid aliquam assumenda illo corporis est placeat. Numquam facilis occaecati.",
        place: "82595 Carleton Lodge",
        goCount: 50,
        status: "REQUEST",
        isOver: false,
      },
    ];
    mockedAxios.get.mockResolvedValueOnce({ data: testMeetups });

    const result = await NetworkRepository.getAllMeetups();

    expect(mockedAxios.get).toHaveBeenCalledWith(apiUrls.meetups);
    expect(result).toEqual(testMeetups);
  });
});
