import { t } from "i18next";

export const dateLocalization = (
  weekdayFormat: "long" | "short",
  date: string
): string => {
  return t("intlDateTime", {
    val: new Date(date),
    formatParams: {
      val: {
        weekday: weekdayFormat,
        month: "long",
        day: "numeric",
      },
    },
  });
};

export const timeLocalization = (date: string): string => {
  return t("intlDateTime", {
    val: new Date(date),
    formatParams: {
      val: {
        hour: "numeric",
        minute: "numeric",
      },
    },
  });
};

export const fullDateTimeLocalization = (
  weekdayFormat: "long" | "short",
  date: string
): string => {
  return t("intlDateTime", {
    val: new Date(date),
    formatParams: {
      val: {
        weekday: weekdayFormat,
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      },
    },
  });
};
