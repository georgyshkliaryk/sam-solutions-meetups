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

interface ILanguageNames {
  [key: string]: string;
}

export const languageNames: ILanguageNames = {
  ru: "Русский",
  en: "English",
  de: "Deutsch",
};

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
  themes: [
    "declinations.meetups.themes.themeProposed1",
    "declinations.meetups.themes.themeProposed2",
    "declinations.meetups.themes.themeProposed3",
  ],
  drafts: [
    "declinations.meetups.drafts.meetupOnModeration1",
    "declinations.meetups.drafts.meetupOnModeration2",
    "declinations.meetups.drafts.meetupOnModeration3",
  ],
  future: [
    "declinations.meetups.future.meetupPublished1",
    "declinations.meetups.future.meetupPublished2",
    "declinations.meetups.future.meetupPublished3",
  ],
  past: [
    "declinations.meetups.past.meetupPassed1",
    "declinations.meetups.past.meetupPassed2",
    "declinations.meetups.past.meetupPassed3",
  ],
  votedUsers: [
    "declinations.votedUsers.voted1",
    "declinations.votedUsers.voted2",
    "declinations.votedUsers.voted3",
  ],
  participants: [
    "declinations.participants.participants1",
    "declinations.participants.participants2",
    "declinations.participants.participants3",
  ],
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
