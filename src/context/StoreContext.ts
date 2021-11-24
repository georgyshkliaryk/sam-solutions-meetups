import { MeetupsStore } from "./../stores/MeetupsStore";
import React from "react";

interface IStoreContext {
  meetupsStore: MeetupsStore;
}
const meetupsStore = new MeetupsStore();

export const StoreContext = React.createContext<IStoreContext>({
  meetupsStore,
});
