import  {  FunctionComponent, useEffect, useState } from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter,
} from "react-router-dom";

import netlifyIdentity, { User } from "netlify-identity-widget";
import { Home } from "./Home/Home";
import { Roster } from "./Roster/Roster";
import { PrivateRoute } from "./PrivateRoute";
import { netlifyAuth } from "./NetlifyAuth";
import { Subscription } from "rxjs";
import { Leaderboard } from "./Leaderboard/Leaderboard";

export const App: FunctionComponent = () => {
  const initialState: { user: User | null } = { user: null };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    let userSubscription: Subscription | null = null;

    userSubscription = netlifyAuth.user$.subscribe((user) => {
      setState({ user: user });
    });
    return () => {
      if (userSubscription) userSubscription.unsubscribe();
    };
  }, []);

  return (
    <Router>
      <AuthButton />
      <div>
        <h1 className="font-light lowercase tracking-tighter animate-pulse">
          Weightless
        </h1>
      </div>
      <nav className="flex justify-evenly space-x-40">
        {state.user && (
          <Link to="/roster" className="">
            Roster
          </Link>
        )}

        {state.user && (
          <Link to="/leaderboard" className="">
            Leaderboard
          </Link>
        )}
      </nav>

      <Switch>
        <PrivateRoute path="/leaderboard" component={Leaderboard} />
        <PrivateRoute path="/roster" component={Roster} />
        <Route path="/login" component={Home} />
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

const AuthButton = withRouter(({ history }) =>
  netlifyIdentity.currentUser() != null ? (
    <div>
      <div>{netlifyIdentity.currentUser()?.user_metadata.full_name}</div>
      <button
        type="button"
        className="p-2 rounded-md shadow-sm"
        onClick={() => {
          netlifyAuth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </div>
  ) : (
    <div>You are not logged in.</div>
  )
);

export default App;
