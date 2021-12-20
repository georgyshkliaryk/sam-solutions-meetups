import { AuthStore } from "./../stores/AuthStore";
import { NetworkRepository } from "./../repositories/NetworkRepository/NetworkRepository";
import { MeetupsRepository } from "./../repositories/MeetupsRepository/MeetupsRepository";
import { MeetupsStore } from "./../stores/MeetupsStore";
import React from "react";
import { NotificationsStore } from "../stores/NotificationsStore";

interface IStoreContext {
  meetupsStore: MeetupsStore;
  authStore: AuthStore;
  notificationsStore: NotificationsStore;
}
const networkRepository = new NetworkRepository();
const meetupsRepository = new MeetupsRepository(networkRepository);
const notificationsStore = new NotificationsStore();
const meetupsStore = new MeetupsStore(
  meetupsRepository,
  networkRepository,
  notificationsStore
);
const authStore = new AuthStore(networkRepository, notificationsStore);

export const StoreContext = React.createContext<IStoreContext>({
  meetupsStore,
  authStore,
  notificationsStore,
});
