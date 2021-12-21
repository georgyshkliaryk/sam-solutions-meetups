import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from "uuid";

export interface INotificationDefinintion {
  type: "success" | "error" | "info" | "warning";
  title: string;
  description?: string;
}

export interface INotification extends INotificationDefinintion {
  id: string;
  timerId: number;
}

export class NotificationsStore {
  notifications: INotification[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setNotification(notification: INotificationDefinintion): void {
    const newTimerId = window.setTimeout(() => {
      if (this.notifications.length !== 0) {
        this.shiftNotification(this.notifications[0].id);
      }
    }, 5000);
    const newNotification: INotification = {
      id: uuidv4(),
      timerId: newTimerId,
      type: notification.type,
      title: notification.title,
      description: notification.description,
    };
    this.notifications.push(newNotification);
  }

  shiftNotification(id: string): void {
    const currentNotification = this.notifications.find(
      (n: INotification) => n.id === id
    );
    const currentTimerId = currentNotification?.timerId;
    this.notifications = this.notifications.filter(
      (n: INotification) => n.id !== id
    );
    window.clearInterval(currentTimerId);
  }

  deleteNotification(id: string): void {
    const deletedNotification = this.notifications.find(
      (n: INotification) => n.id === id
    );
    const deletedTimerId = deletedNotification?.timerId;
    this.notifications = this.notifications.filter(
      (n: INotification) => n.id !== id
    );
    window.clearInterval(deletedTimerId);
  }
}
