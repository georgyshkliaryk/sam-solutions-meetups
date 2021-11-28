import { generateAvatar } from "../helpers/avatarGenerator";

const testUsers = [
  {
    name: "John",
    surname: "Walter",
  },
  {
    name: "FRANCO",
    surname: "kiebler",
  },
  {
    name: "fausto",
    surname: "larkin",
  },
  {
    name: "D",
    surname: "d",
  },
  {
    name: "David",
  },
  {
    name: "andrew",
  },
];

test("Test for correct avatar generation", () => {
  expect(generateAvatar(testUsers[0])).toStrictEqual({
    initials: "JW",
    color: "darkcyan",
  });
  expect(generateAvatar(testUsers[1])).toStrictEqual({
    initials: "FK",
    color: "darkviolet",
  });
  expect(generateAvatar(testUsers[2])).toStrictEqual({
    initials: "FL",
    color: "darkslategray",
  });
  expect(generateAvatar(testUsers[3])).toStrictEqual({
    initials: "DD",
    color: "darkslategray",
  });
});

test("Test for correct avatar generation without surname", () => {
  expect(generateAvatar(testUsers[4])).toStrictEqual({
    initials: "D",
    color: "darkslateblue",
  });
  expect(generateAvatar(testUsers[5])).toStrictEqual({
    initials: "A",
    color: "darkviolet",
  });
});
