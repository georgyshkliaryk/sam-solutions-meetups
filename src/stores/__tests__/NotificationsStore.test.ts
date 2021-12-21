import { INotificationDefinintion } from "./../NotificationsStore";
import { INotification, NotificationsStore } from "../NotificationsStore";

const notificationsStore = new NotificationsStore();

const testErrorToast: INotificationDefinintion = {
  type: "error",
  title: "Error",
  description: "Test description",
};

test("Initial notifications state", () => {
  expect(notificationsStore.notifications.length).toEqual(0);
});

test("Testing error notification", () => {
  notificationsStore.setNotification(testErrorToast);
  expect(notificationsStore.notifications).toHaveLength(1);
  expect(notificationsStore.notifications[0].title).toEqual(
    testErrorToast.title
  );
  expect(notificationsStore.notifications[0].description).toEqual(
    testErrorToast.description
  );
  expect(notificationsStore.notifications[0].type).toEqual(testErrorToast.type);
  notificationsStore.shiftNotification(notificationsStore.notifications[0].id);
  expect(notificationsStore.notifications).toHaveLength(0);
});
