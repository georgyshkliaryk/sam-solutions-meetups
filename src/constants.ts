interface Routes {
  meetups: string;
  news: string;
  themes: string;
  drafts: string;
  future: string;
  past: string;
}

export const routes: Routes = {
  meetups: "/meetups",
  news: "/news",
  themes: "themes",
  drafts: "drafts",
  future: "future",
  past: "past",
};

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
