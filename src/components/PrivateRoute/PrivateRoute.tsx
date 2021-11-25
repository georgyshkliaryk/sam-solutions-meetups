import React, { ReactElement, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { routes } from "../../constants";

const PrivateRoute: React.FC = observer(({ children }): ReactElement => {
  const { authStore } = useContext(StoreContext);
  return (
    <>{authStore.isAuthenticated ? children : <Navigate to={routes.login} />}</>
  );
});

export default PrivateRoute;
