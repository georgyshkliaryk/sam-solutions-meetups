import { makeAutoObservable } from "mobx";

interface INotification {
  type: "success" | "error" | "info";
  title: string;
  description?: string;
}

export class NotificationsStore {
  notifications: INotification[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setNotification(notification: INotification) {
    this.notifications.push(notification);
  }
}
