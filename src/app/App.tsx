import React, { Component } from "react";
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

export class App extends Component<any, { user: User | null }> {
  userSubscription: Subscription | null = null;

  constructor(props: any) {
    super(props);
    this.state = { user: null };
  }

  componentDidMount() {
    this.userSubscription = netlifyAuth.user$.subscribe((user) => {
      this.setState({ user: user });
    });
  }

  componentWillUnmount() {
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }

  render() {
    return (
      <Router>
        <AuthButton />
        <div>
          <h1 className="font-light lowercase tracking-tighter animate-pulse">
            Weightless
          </h1>
        </div>
        <nav className="flex justify-evenly space-x-40" >
          {this.state.user && (
              <Link to="/roster" className="">
                Roster
              </Link>
          )}

          {this.state.user && (
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
  }
}

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
