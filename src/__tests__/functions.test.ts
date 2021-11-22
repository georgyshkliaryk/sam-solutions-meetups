import { apiUrls } from "../constants";
import MeetupsRepository from "../repositories/MeetupsRepository/MeetupsRepository";
import NetworkRepository from "../repositories/NetworkRepository/NetworkRepository";

test("Meetups Past", () => {
  expect(MeetupsRepository.getMeetupsPast()).toEqual([]);
});
test("Meetups Drafts", () => {
  NetworkRepository.getAllMeetups(apiUrls.meetups);
  expect(MeetupsRepository.getMeetupsDrafts()).toEqual([]);
});
