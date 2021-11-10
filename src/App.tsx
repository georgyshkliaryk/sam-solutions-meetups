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

const App: React.FC = (): ReactElement => {
  return (
    <Router>
      <Switch>
        <Route exact path="/meetups/themes">
          <ThemesPage />
        </Route>
        <Route exact path="/news">
          <NewsPage />
        </Route>
        <Route exact path="/meetups/drafts">
          <DraftsPage />
        </Route>
        <Route exact path="/meetups/future">
          <FuturePage />
        </Route>
        <Route exact path="/meetups/past">
          <PastPage />
        </Route>
        <Redirect to="/meetups/themes" />
      </Switch>
    </Router>
  );
};

export default App;
