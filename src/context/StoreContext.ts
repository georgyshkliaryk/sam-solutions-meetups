import { NewsRepository } from "./../repositories/NewsRepository/NewsRepository";
import { NewsStore } from "./../stores/NewsStore";
import { AuthStore } from "./../stores/AuthStore";
import { NetworkRepository } from "./../repositories/NetworkRepository/NetworkRepository";
import { MeetupsRepository } from "./../repositories/MeetupsRepository/MeetupsRepository";
import { MeetupsStore } from "./../stores/MeetupsStore";
import React from "react";
import { NotificationsStore } from "../stores/NotificationsStore";

interface IStoreContext {
  meetupsStore: MeetupsStore;
  newsStore: NewsStore;
  authStore: AuthStore;
  notificationsStore: NotificationsStore;
}

const networkRepository = new NetworkRepository();
const meetupsRepository = new MeetupsRepository(networkRepository);
const newsRepository = new NewsRepository(networkRepository);

const notificationsStore = new NotificationsStore();
const meetupsStore = new MeetupsStore(
  meetupsRepository,
  networkRepository,
  notificationsStore
);
const newsStore = new NewsStore(
  newsRepository,
  networkRepository,
  notificationsStore
);
const authStore = new AuthStore(networkRepository, notificationsStore);

export const StoreContext = React.createContext<IStoreContext>({
  meetupsStore,
  authStore,
  notificationsStore,
  newsStore,
});
