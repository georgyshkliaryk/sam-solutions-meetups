import { ReactElement, Suspense } from "react";
import "./App.scss";
import NewsPage from "./pages/news/NewsPage";
import { MeetupPageTypes, routes } from "./constants";
import MeetupsPage from "./pages/meetups/MeetupsPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ViewThemePage from "./pages/viewTheme/ViewThemePage";
import CreateMeetupPage from "./pages/createMeetup/CreateMeetupPage";
import EditMeetupPage from "./pages/EditMeetupPage/EditMeetupPage";
import Notifications from "./components/Notifications/Notifications";
import ViewMeetupPage from "./pages/viewMeetup/ViewMeetupPage";
import ViewNewsPage from "./pages/viewNewsPage/ViewNewsPage";

const App: React.FC = (): ReactElement => {
  return (
    <Suspense fallback={<div>...</div>}>
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
            path={`${routes.meetups}/${routes.drafts}/:id/edit`}
            element={
              <PrivateRoute>
                <EditMeetupPage />
              </PrivateRoute>
            }
          />
          <Route
            path={`${routes.meetups}/${routes.future}/:id/edit`}
            element={
              <PrivateRoute>
                <EditMeetupPage />
              </PrivateRoute>
            }
          />
          <Route
            path={`${routes.meetups}/${routes.past}/:id/edit`}
            element={
              <PrivateRoute>
                <EditMeetupPage />
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
          <Route
            path={`${routes.news}/:id`}
            element={
              <PrivateRoute>
                <ViewNewsPage />
              </PrivateRoute>
            }
          />
          <Route path={routes.login} element={<LoginPage />} />
          <Route path="*" element={<Navigate replace to={routes.meetups} />} />
        </Routes>
        <Notifications />
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
