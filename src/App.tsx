import { ReactElement } from "react";
import "./App.scss";
import NewsPage from "./pages/news/NewsPage";
import { routes } from "./constants";
import MeetupsPage from "./pages/meetups/MeetupsPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const App: React.FC = (): ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={`${routes.meetups}/*`}
          element={<PrivateRoute component={MeetupsPage} />}
        />
        <Route
          path={routes.news}
          element={<PrivateRoute component={NewsPage} />}
        />
        <Route path={routes.login} element={<LoginPage />} />
        <Route path="*" element={<Navigate replace to={routes.meetups} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
