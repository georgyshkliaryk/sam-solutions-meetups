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

const App: React.FC = (): ReactElement => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <ThemesPage />
        </Route>
        <Route exact path="/news">
          <NewsPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
