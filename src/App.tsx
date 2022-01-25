import { ReactElement } from "react";
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
import CreateArticlePage from "./pages/createArticle/CreateArticlePage";
import EditArticlePage from "./pages/editArticle/EditArticlePage";
import ErrorPage from "./pages/error/ErrorPage";
import { useTranslation } from "react-i18next";

const App: React.FC = (): ReactElement => {
  const { t } = useTranslation();

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
          path={`${routes.news}/${routes.create}`}
          element={
            <PrivateRoute>
              <CreateArticlePage />
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
        <Route
          path={`${routes.news}/:id/edit`}
          element={
            <PrivateRoute>
              <EditArticlePage />
            </PrivateRoute>
          }
        />
        <Route
          path={routes.notFound}
          element={
            <PrivateRoute>
              <ErrorPage
                title="404"
                description={t("pageErrors.notFound")}
                iconName="warning"
              />
            </PrivateRoute>
          }
        />
        <Route
          path={routes.accessDenied}
          element={
            <PrivateRoute>
              <ErrorPage
                title="403"
                description={t("pageErrors.accessDenied")}
                iconName="lock"
              />
            </PrivateRoute>
          }
        />
        <Route path={routes.login} element={<LoginPage />} />
        <Route
          path={routes.meetups}
          element={
            <Navigate replace to={`${routes.meetups}/${routes.themes}`} />
          }
        />
        <Route path="*" element={<Navigate replace to={routes.notFound} />} />
      </Routes>
      <Notifications />
    </BrowserRouter>
  );
};

export default App;
