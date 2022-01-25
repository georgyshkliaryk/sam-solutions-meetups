import React, { ReactElement, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Navigate, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { routes } from "../../constants";

interface IProps {
  type?: string;
}

const PrivateRoute: React.FC<IProps> = observer(
  ({ children }): ReactElement => {
    const location = useLocation();
    const { authStore } = useContext(StoreContext);

    return (
      <>
        {authStore.isAuthenticated ? (
          children
        ) : (
          <Navigate replace to={routes.login} state={{ from: location }} />
        )}
      </>
    );
  }
);

export default PrivateRoute;
