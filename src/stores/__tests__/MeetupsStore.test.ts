import MeetupsStore from "../MeetupsStore";

test("Initial state", () => {
  expect(MeetupsStore.drafts.length).toEqual(0);
  expect(MeetupsStore.themes.length).toEqual(0);
  expect(MeetupsStore.meetups.length).toEqual(0);
});
