import { i18n } from "dateformat";

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

export const routes = {
  meetups: "/meetups",
  news: "/news",
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

export interface IUser {
  firstName: string;
  lastName: string;
  avatar: string;
}

export const defaultUser: IUser = {
  firstName: "Name",
  lastName: "Surname",
  avatar: "",
};

export enum meetupTypes {
  REQUEST = "REQUEST",
  DRAFT = "DRAFT",
  CONFIRMED = "CONFIRMED",
}

export const apiUrls = {
  meetups: "/meetups",
  users: "/users",
} as const;
