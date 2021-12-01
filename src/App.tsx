import { ReactElement } from "react";
import "./App.scss";
import NewsPage from "./pages/news/NewsPage";
import { MeetupPageTypes, routes } from "./constants";
import MeetupsPage from "./pages/meetups/MeetupsPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ViewThemePage from "./pages/viewTheme/ViewThemePage";
import ViewMeetupPage from "./pages/viewMeetup/ViewMeetupPage";
import CreateMeetupPage from "./pages/createMeetup/CreateMeetupPage";

const App: React.FC = (): ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={`${routes.meetups}/*`}
          element={
            <PrivateRoute>
              <MeetupsPage />
            </PrivateRoute>
          }
        />
        <Route
          path={`${routes.meetups}/${routes.themes}/:id`}
          element={
            <PrivateRoute>
              <ViewThemePage />
            </PrivateRoute>
          }
        />
        <Route
          path={`${routes.meetups}/${routes.drafts}/:id`}
          element={
            <PrivateRoute>
              <ViewMeetupPage type={MeetupPageTypes.DRAFT} />
            </PrivateRoute>
          }
        />
        <Route
          path={`${routes.meetups}/${routes.future}/:id`}
          element={
            <PrivateRoute>
              <ViewMeetupPage type={MeetupPageTypes.FUTURE} />
            </PrivateRoute>
          }
        />
        <Route
          path={`${routes.meetups}/${routes.past}/:id`}
          element={
            <PrivateRoute>
              <ViewMeetupPage type={MeetupPageTypes.PAST} />
            </PrivateRoute>
          }
        />
        <Route
          path={`${routes.meetups}/${routes.create}`}
          element={
            <PrivateRoute>
              <CreateMeetupPage />
            </PrivateRoute>
          }
        />
        <Route
          path={routes.news}
          element={
            <PrivateRoute>
              <NewsPage />
            </PrivateRoute>
          }
        />
        <Route path={routes.login} element={<LoginPage />} />
        <Route path="*" element={<Navigate replace to={routes.meetups} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
