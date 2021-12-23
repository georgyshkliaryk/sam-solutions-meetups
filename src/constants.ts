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
  create: "create",
} as const;

export interface NavItem {
  title: string;
  path: string;
}

export interface NavItems {
  [key: string]: NavItem[];
}

export const LOCALES = {
  RU: "ru",
  EN: "en",
  DE: "de",
} as const;

export const navItems: NavItems = {
  header: [
    {
      title: "navbar.header.meetups",
      path: routes.meetups,
    },
    {
      title: "navbar.header.news",
      path: routes.news,
    },
  ],
  meetups: [
    {
      title: "navbar.main.themes",
      path: routes.themes,
    },
    {
      title: "navbar.main.drafts",
      path: routes.drafts,
    },
    {
      title: "navbar.main.future",
      path: routes.future,
    },
    {
      title: "navbar.main.past",
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
  DRAFT = "DRAFTS",
  FUTURE = "FUTURE",
  PAST = "PAST",
}

export enum UserRoles {
  EMPLOYEE = "EMPLOYEE",
  CHIEF = "CHIEF",
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
  votedUsers: ["поддерживает", "поддерживают", "поддерживают"],
  participants: ["человек идет", "человека идут", "человек идут"],
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

export const fileMaxSize = 1000000;

export const imageTypesRegex = /^image\/(jpe?g|png)$/;
