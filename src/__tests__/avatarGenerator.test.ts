import { generateAvatarData } from "../helpers/avatarGenerator";

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
  expect(
    generateAvatarData(testUsers[0].name, testUsers[0].surname)
  ).toStrictEqual({
    initials: "JW",
    color: "darkcyan",
  });
  expect(
    generateAvatarData(testUsers[1].name, testUsers[1].surname)
  ).toStrictEqual({
    initials: "FK",
    color: "darkviolet",
  });
  expect(
    generateAvatarData(testUsers[2].name, testUsers[2].surname)
  ).toStrictEqual({
    initials: "FL",
    color: "darkslategray",
  });
  expect(
    generateAvatarData(testUsers[3].name, testUsers[3].surname)
  ).toStrictEqual({
    initials: "DD",
    color: "darkslategray",
  });
});

test("Test for correct avatar generation without surname", () => {
  expect(generateAvatarData(testUsers[4].name)).toStrictEqual({
    initials: "D",
    color: "darkslateblue",
  });
  expect(generateAvatarData(testUsers[5].name)).toStrictEqual({
    initials: "A",
    color: "darkviolet",
  });
});
