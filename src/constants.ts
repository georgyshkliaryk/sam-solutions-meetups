import { i18n } from "dateformat";

i18n.dayNames = [
  "Воскр.",
  "Пон.",
  "Вт.",
  "Ср.",
  "Четв.",
  "Пятн.",
  "Суб.",
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
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

export const routes = {
  meetups: "/meetups",
  news: "/news",
  login: "/login",
  themes: "themes",
  drafts: "drafts",
  future: "future",
  past: "past",
} as const;

export interface NavItem {
  title: string;
  path: string;
}

export interface NavItems {
  [key: string]: NavItem[];
}

export const navItems: NavItems = {
  header: [
    {
      title: "Митапы",
      path: routes.meetups,
    },
    {
      title: "Новости",
      path: routes.news,
    },
  ],
  meetups: [
    {
      title: "Темы",
      path: routes.themes,
    },
    {
      title: "На модерации",
      path: routes.drafts,
    },
    {
      title: "Будущие",
      path: routes.future,
    },
    {
      title: "Прошедшие",
      path: routes.past,
    },
  ],
};

export enum MeetupTypes {
  REQUEST = "REQUEST",
  DRAFT = "DRAFT",
  CONFIRMED = "CONFIRMED",
}

export enum MeetupPageTypes {
  DRAFT = "DRAFT",
  FUTURE = "FUTURE",
  PAST = "PAST",
}

export const apiUrls = {
  meetups: "/meetups",
  users: "/users",
  login: "/login",
  logout: "/logout",
} as const;

interface IDeclination {
  [key: string]: string[];
}

export const NumberDeclination: IDeclination = {
  themes: ["тема предложена", "темы предложены", "тем предложено"],
  drafts: ["митап на модерации", "митапа на модерации", "митапов на модерации"],
  future: ["митап опубликован", "митапа опубликовано", "митапов опубликовано"],
  past: ["митап прошел", "митапа прошло", "митапов прошло"],
  participants: ["поддерживает", "поддерживают", "поддерживают"],
};

export const avatarColors: string[] = [
  "darkblue",
  "darkcyan",
  "darkolivegreen",
  "darkmagenta",
  "darkred",
  "darkviolet",
  "darkslategray",
  "green",
  "darkslateblue",
  "crimson",
];
