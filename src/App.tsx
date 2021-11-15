import { ReactElement } from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import NewsPage from "./pages/news/NewsPage";
import { routes } from "./constants";
import MeetupsPage from "./pages/meetups/MeetupsPage";

const App: React.FC = (): ReactElement => {
  return (
    <Router>
      <Switch>
        <Route path={routes.meetups}>
          <MeetupsPage />
        </Route>
        <Route path={routes.news}>
          <NewsPage />
        </Route>
        <Redirect to={routes.meetups} />
      </Switch>
    </Router>
  );
};

export default App;
