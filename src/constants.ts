interface RouteItems {
  [key: string]: string;
}

interface Routes {
  meetups: RouteItems;
  news: string;
}

export const routes: Routes = {
  meetups: {
    themes: "/meetups/themes",
    drafts: "/meetups/drafts",
    future: "/meetups/future",
    past: "/meetups/past",
  },
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
      path: routes.meetups.themes,
    },
    {
      title: "Новости",
      path: routes.news,
    },
  ],
  meetups: [
    {
      title: "Темы",
      path: routes.meetups.themes,
    },
    {
      title: "Черновики",
      path: routes.meetups.drafts,
    },
    {
      title: "Будущие",
      path: routes.meetups.future,
    },
    {
      title: "Прошедшие",
      path: routes.meetups.past,
    },
  ],
};
