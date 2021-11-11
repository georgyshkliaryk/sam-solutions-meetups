export const routes = {
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
};
