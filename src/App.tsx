import { ReactElement } from "react";
import "./App.scss";
import NewsPage from "./pages/news/NewsPage";
import { routes } from "./constants";
import MeetupsPage from "./pages/meetups/MeetupsPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const App: React.FC = (): ReactElement => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${routes.meetups}/*`} element={<MeetupsPage />} />
        <Route path={routes.news} element={<NewsPage />} />
        <Route path="*" element={<Navigate replace to={routes.meetups} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
