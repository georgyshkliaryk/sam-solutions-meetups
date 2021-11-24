import { NetworkRepository } from "./../repositories/NetworkRepository/NetworkRepository";
import { MeetupsRepository } from "./../repositories/MeetupsRepository/MeetupsRepository";
import { MeetupsStore } from "./../stores/MeetupsStore";
import React from "react";

interface IStoreContext {
  meetupsStore: MeetupsStore;
}
const networkRepository = new NetworkRepository();
const meetupsRepository = new MeetupsRepository(networkRepository);
const meetupsStore = new MeetupsStore(meetupsRepository);

export const StoreContext = React.createContext<IStoreContext>({
  meetupsStore,
});
