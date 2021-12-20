import { observer } from "mobx-react-lite";
import React, { ReactElement, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./Notifications.scss";

const Notifications: React.FC = observer((): ReactElement => {
  const { notificationsStore } = useContext(StoreContext);
  return (
    <div className="notifications">
      {notificationsStore.notifications.map((n, i) => (
        <div className="notifications-item" key={i}>
          <p>{n.title}</p>
          <p>{n.description}</p>
        </div>
      ))}
    </div>
  );
});

export default Notifications;
