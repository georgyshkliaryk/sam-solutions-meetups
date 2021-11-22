import { NumberDeclination } from "../constants";
import { numberDeclination } from "./../helpers/declination";

test("Declination test 1", () => {
  expect(numberDeclination(1, NumberDeclination.themes)).toBe(
    "1 тема предложена"
  );
});

test("Declination test 2", () => {
  expect(numberDeclination(13017, NumberDeclination.drafts)).toBe(
    "13017 митапов на модерации"
  );
});

test("Declination test 3", () => {
  expect(numberDeclination(200, NumberDeclination.future)).toBe(
    "200 митапов опубликовано"
  );
});

test("Declination test 4", () => {
  expect(numberDeclination(100, NumberDeclination.participants)).toBe(
    "100 поддерживают"
  );
});
