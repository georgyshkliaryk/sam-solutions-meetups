import { ReactElement } from "react";
import "./App.scss";
import ThemesPage from "./pages/meetups/themes/ThemesPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import NewsPage from "./pages/news/NewsPage";
import DraftsPage from "./pages/meetups/drafts/DraftsPage";
import FuturePage from "./pages/meetups/future/FuturePage";
import PastPage from "./pages/meetups/past/PastPage";
import { routes } from "./constants";

const App: React.FC = (): ReactElement => {
  return (
    <Router>
      <Switch>
        <Route exact path={routes.meetups.themes}>
          <ThemesPage />
        </Route>
        <Route exact path={routes.news}>
          <NewsPage />
        </Route>
        <Route exact path={routes.meetups.drafts}>
          <DraftsPage />
        </Route>
        <Route exact path={routes.meetups.future}>
          <FuturePage />
        </Route>
        <Route exact path={routes.meetups.past}>
          <PastPage />
        </Route>
        <Redirect to={routes.meetups.themes} />
      </Switch>
    </Router>
  );
};

export default App;
