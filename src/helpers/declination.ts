import i18next from "i18next";

export const numberDeclination = (num: number, words: string[]): string => {
  const lastTwoDigits = num % 100;
  const lastDigit = num % 10;
  if (lastTwoDigits > 10 && lastTwoDigits < 20) {
    return `${num} ${i18next.t(words[2])}`;
  }
  if (lastDigit > 1 && lastDigit < 5) {
    return `${num} ${i18next.t(words[1])}`;
  }
  if (lastDigit === 1) {
    return `${num} ${i18next.t(words[0])}`;
  }
  return `${num} ${i18next.t(words[2])}`;
};
