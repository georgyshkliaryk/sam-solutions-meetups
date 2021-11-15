interface RouteItems {
  [key: string]: string;
}

interface Routes {
  meetups: string;
  news: string;
}

export const routes: Routes = {
  meetups: "/meetups",
  news: "/news",
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
      path: routes.meetups,
    },
    {
      title: "На модерации",
      path: routes.meetups,
    },
    {
      title: "Будущие",
      path: routes.meetups,
    },
    {
      title: "Прошедшие",
      path: routes.meetups,
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
