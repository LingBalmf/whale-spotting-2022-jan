import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Home } from "./components/homepage/Home";
import { useContext } from "react";
import { LoginContext } from "./components/login/LoginManager";
import { Navbar } from "./components/navbar/Navbar";
import { LoginManager } from "./components/login/LoginManager";
import { Footer } from "./components/footer/Footer";
import { PlanATripPage } from "./components/planATripPage/PlanATripPage";
import { CreateSightingPage } from "./components/createSightingPage/CreateSightingPage";
import { CreateUser } from "./pages/SignUp/SignUp";
import { Login } from "./components/login/Login";
import { SightingListPage } from "./pages/Sightings/SightingListPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { SpeciesListPage } from "./components/SpeciesListPage/SpeciesListPage";
import { CreateSpeciesPage } from "./components/createSpeciesPage/CreateSpeciesPage";
import { UpdateSpeciesPage } from "./components/updateSpeciesPage/UpdateSpeciesPage";
import { Leaderboard } from "./pages/Leaderboard/Leaderboard";
import { UpdateUserRole } from "./components/UpdateUserRolePage/UpdateUserRole";
import { WhalesListPage } from "./components/whalesListPage/WhalesListPage";
import { CreateWhalePage } from "./components/createWhalePage/CreateWhalePage";

const Routes: React.FunctionComponent = () => {
  const loginContext = useContext(LoginContext);

  return (
    <Switch>
      <Route path="/sign-up">{<CreateUser />}</Route>
      <Route path="/sightings/create">
        {loginContext.isLoggedIn ? <CreateSightingPage /> : <Login />}
      </Route>
      <Route path="/sightings">
        <SightingListPage />
      </Route>
      <Route path="/login">
        <Login />
        {loginContext.isLoggedIn ? (
          <Redirect to="/" />
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
      <Route path="/plantrip">
        <PlanATripPage />
      </Route>
      <Route path="/leaderboard">
        <Leaderboard />
      </Route>
      <Route exact path="/species">
        <SpeciesListPage />
      </Route>
      <Route path="/species/create">
        {loginContext.isAdmin ? <CreateSpeciesPage /> : <Login />}
      </Route>
      <Route path="/species/:id/update">
        {loginContext.isAdmin ? <UpdateSpeciesPage /> : <Login />}
      </Route>
      <Route exact path="/whales">
        <WhalesListPage />
      </Route>
      <Route path="/whales/create">
        {loginContext.isAdmin ? <CreateWhalePage /> : <Login />}
      </Route>
      <Route path="/users/update">
        {loginContext.isAdmin ? <UpdateUserRole /> : <Login />}
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
};

const App: React.FunctionComponent = () => {
  return (
    <Router>
      <LoginManager>
        <Navbar />
        <main>
          <Routes />
        </main>
        <Footer />
      </LoginManager>
    </Router>
  );
};

export default App;
