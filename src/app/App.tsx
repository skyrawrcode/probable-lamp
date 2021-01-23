import React, { FunctionComponent, useEffect, useState } from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
  NavLink,
} from "react-router-dom";

import netlifyIdentity, { User } from "netlify-identity-widget";
import { Home } from "./Home/Home";
import { Roster } from "./Roster/Roster";
import { PrivateRoute } from "./PrivateRoute";
import { netlifyAuth } from "./NetlifyAuth";
import { Subscription } from "rxjs";
import { Leaderboard } from "./Leaderboard/Leaderboard";
import {generateQuip} from './WeightQuips'

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
      <header>
        <AuthButton />
        <div className="flex">
          <h1 className="font-light lowercase tracking-tighter animate-pulse mx-auto mb-0 inline-block">
            Weightless
          </h1>
        </div>
        <nav className="flex lg:-mt-8 justify-evenly items-end border-b">
          {state.user && (
            <NavLink
              to="/roster"
              className="transition transform lowercase font-mono"
              activeClassName="font-extrabold mb-1"
            >
              Roster
            </NavLink>
          )}
          {state.user && (
            <NavLink
              to="/leaderboard"
              className="lowercase font-mono"
              activeClassName="font-extrabold mb-1"
            >
              Leaderboard
            </NavLink>
          )}
        </nav>
      </header>
      <div>
        {generateQuip(3)}
      </div>
      <main>
        <Switch>
          <PrivateRoute path="/leaderboard" component={Leaderboard} />
          <PrivateRoute path="/roster" component={Roster} />
          <Route path="/login" component={Home} />
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </main>

    </Router>
  );
};

const AuthButton = withRouter(({ history }) =>
  netlifyIdentity.currentUser() != null ? (
    <div className="flex flex-row shadow-md pt-1 pb-1 bg-blue-700 text-gray-200 font-bold ">
      <div className="py-1 ml-2 mr-auto ">
        {netlifyIdentity.currentUser()?.user_metadata.full_name}
      </div>
      <button
        type="button"
        className="px-2 py-1 mr-2 font-bold hover:text-gray-300"
        onClick={() => {
          netlifyAuth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </div>
  ) : (
    <></>
  )
);

export default App;
