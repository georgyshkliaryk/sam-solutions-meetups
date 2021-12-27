import { t } from "i18next";

export const numberDeclination = (num: number, words: string[]): string => {
  const lastTwoDigits = num % 100;
  const lastDigit = num % 10;
  if (lastTwoDigits > 10 && lastTwoDigits < 20) {
    return `${num} ${t(words[2])}`;
  }
  if (lastDigit > 1 && lastDigit < 5) {
    return `${num} ${t(words[1])}`;
  }
  if (lastDigit === 1) {
    return `${num} ${t(words[0])}`;
  }
  return `${num} ${t(words[2])}`;
};
