import { makeAutoObservable } from "mobx";

export interface INotification {
  type: "success" | "error" | "info" | "warning";
  title: string;
  description?: string;
}

export class NotificationsStore {
  notifications: INotification[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setNotification(notification: INotification): void {
    this.notifications.push(notification);
  }

  shiftNotification(): void {
    this.notifications.shift();
  }
}
