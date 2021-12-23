import { NotificationsStore } from "./../NotificationsStore";
import { apiUrls } from "./../../constants";
import { IMeetupFromServer } from "./../../repositories/interfaces/INetworkRepository";
import axios from "axios";
import { IMeetup } from "../../repositories/interfaces/IMeetupsRepository";
import { MeetupsStore } from "../MeetupsStore";
import { NetworkRepository } from "../../repositories/NetworkRepository/NetworkRepository";
import { MeetupsRepository } from "./../../repositories/MeetupsRepository/MeetupsRepository";
const mockedAxios = axios as jest.Mocked<typeof axios>;

const testMeetups: IMeetupFromServer[] = [
  {
    id: "2de0306f-a712-4078-b1f0-b223c2f4246b",
    start: "2022-06-09T23:35:47.068Z",
    author: {
      id: "12313",
      name: "employee",
      surname: "Gerlach",
    },
    speakers: [
      {
        id: "206c074c-eaa8-44bc-aa8e-be04916950c4",
        name: "Maya",
        surname: "Shanahan",
      },
    ],
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
      id: "1231323",
      name: "Lavern",
      surname: "Gerlach",
    },
    speakers: [
      {
        id: "206c074c-eaa8-44bc-aa8e-be04916950c4",
        name: "Maya",
        surname: "Shanahan",
      },
    ],
    subject: "Universal real-time info-mediaries",
    excerpt:
      "Quae commodi qui. Voluptas et totam consectetur aut. Dolor fugiat soluta aliquid aliquam assumenda illo corporis est placeat. Numquam facilis occaecati.",
    place: "82595 Carleton Lodge",
    goCount: 50,
    status: "REQUEST",
    isOver: false,
  },
];

const testParsedMeetups: IMeetup[] = [
  {
    id: "2de0306f-a712-4078-b1f0-b223c2f4246b",
    start: "2022-06-09T23:35:47.068Z",
    authorId: "12313",
    authorName: "employee",
    authorSurname: "Gerlach",
    speakers: [
      {
        id: "206c074c-eaa8-44bc-aa8e-be04916950c4",
        name: "Maya",
        surname: "Shanahan",
      },
    ],
    title: "Reverse-engineered even-keeled standardization",
    description:
      "Nemo pariatur dolores ut vero velit non. Quidem temporibus quod nihil amet recusandae atque provident voluptatum iste. Aut architecto cum sit rerum aliquam maxime. Ratione voluptate optio id molestias quia quidem ipsam. Eius voluptatem quia dolores enim assumenda. Consequuntur cupiditate error earum hic est numquam vero.",
    place: "630 Goyette Causeway",
    goCount: 64,
    status: "DRAFT",
    isOver: false,
  },
  {
    id: "234c96f4-f156-47f0-93fd-912c89dc4884",
    start: "2022-08-22T01:44:16.955Z",
    authorId: "1231323",
    authorName: "Lavern",
    authorSurname: "Gerlach",
    speakers: [
      {
        id: "206c074c-eaa8-44bc-aa8e-be04916950c4",
        name: "Maya",
        surname: "Shanahan",
      },
    ],
    title: "Universal real-time info-mediaries",
    description:
      "Quae commodi qui. Voluptas et totam consectetur aut. Dolor fugiat soluta aliquid aliquam assumenda illo corporis est placeat. Numquam facilis occaecati.",
    place: "82595 Carleton Lodge",
    goCount: 50,
    status: "REQUEST",
    isOver: false,
  },
];

const networkRepository = new NetworkRepository();
const meetupsRepository = new MeetupsRepository(networkRepository);
const notificationsStore = new NotificationsStore();
const meetupsStore = new MeetupsStore(
  meetupsRepository,
  networkRepository,
  notificationsStore
);

test("Initial meetups state", () => {
  expect(meetupsStore.drafts.length).toEqual(0);
  expect(meetupsStore.themes.length).toEqual(0);
  expect(meetupsStore.past.length).toEqual(0);
  expect(meetupsStore.future.length).toEqual(0);
  expect(meetupsStore.meetups.length).toEqual(0);
});

jest.mock("axios");

describe("Fetch meetups", () => {
  it("should return meetups list", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: testMeetups });

    const result = await networkRepository.getAllMeetups();

    expect(mockedAxios.get).toHaveBeenCalledWith(apiUrls.meetups);
    expect(result.length).toBe(2);
    expect(result).toEqual(testMeetups);
  });
});

describe("Parse meetups", () => {
  it("should return parsed meetups list", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: testMeetups });

    const result = await meetupsRepository.getAllMeetups();

    expect(result.length).toBe(2);
    expect(result).toEqual(testParsedMeetups);
  });
});
