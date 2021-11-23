import dateFormat, { i18n } from "dateformat";

i18n.dayNames = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскр.",
  "Пон.",
  "Вт.",
  "Ср.",
  "Четв.",
  "Пятн.",
  "Суб.",
];

i18n.monthNames = [
  "янв",
  "февр",
  "мар",
  "апр",
  "мая",
  "июн",
  "июл",
  "авг",
  "сент",
  "окт",
  "нояб",
  "дек",
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

test("Test for correct formatting of the date", () => {
  expect(dateFormat("2022-06-09T23:35:47.068Z", "dddd, d mmmm ● H:MM")).toBe(
    "Пятн., 10 июня ● 2:35"
  );
  expect(
    dateFormat("2022-06-13T05:09:47.076Z", "dddd, mmmm dS, yyyy, h:MM:ss TT")
  ).toBe("Пон., июня 13th, 2022, 8:09:47 AM");
});

test("Test for displaying correct full date", () => {
  expect(dateFormat("Jun 9 2007", "fullDate")).toBe("Суб., июня 9, 2007");
});
