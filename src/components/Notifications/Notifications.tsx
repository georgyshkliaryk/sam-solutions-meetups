import classNames from "classnames";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import React, { ReactElement, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { INotification } from "../../stores/NotificationsStore";
import "./Notifications.scss";

const Notifications: React.FC = observer((): ReactElement => {
  const { notificationsStore } = useContext(StoreContext);

  console.log(toJS(notificationsStore.notifications));

  return (
    <div className="notifications">
      {notificationsStore.notifications.map((n: INotification) => (
        <div
          className={classNames(
            "notifications-item",
            `notifications-item-${n.type}`
          )}
          key={n.id}
        >
          <p className="notification-item__image">
            {n.type === "success" ? (
              <span className="material-icons-round">check_circle</span>
            ) : n.type === "error" ? (
              <span className="material-icons-round">warning</span>
            ) : n.type === "warning" ? (
              <span className="material-icons-round">error_outline</span>
            ) : (
              <span className="material-icons-round">info</span>
            )}
          </p>
          <div className="notification-item-text">
            <p className="notifications-item-text__title">{n.title}</p>
            <p className="notifications-item-text__description">
              {n.description}
            </p>
          </div>
          <button
            className="notifications-item-button-close"
            onClick={() => notificationsStore.deleteNotification(n.id)}
          >
            <span className="material-icons-round">close</span>
          </button>
        </div>
      ))}
    </div>
  );
});

export default Notifications;
