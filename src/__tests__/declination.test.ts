import { NumberDeclination } from "../constants";
import { numberDeclination } from "./../helpers/declination";

test("Test for correct declination of words with different numbers", () => {
  expect(numberDeclination(1, NumberDeclination.themes)).toBe(
    "1 тема предложена"
  );
  expect(numberDeclination(13017, NumberDeclination.drafts)).toBe(
    "13017 митапов на модерации"
  );
  expect(numberDeclination(200, NumberDeclination.future)).toBe(
    "200 митапов опубликовано"
  );
  expect(numberDeclination(100, NumberDeclination.participants)).toBe(
    "100 человек идут"
  );
});
