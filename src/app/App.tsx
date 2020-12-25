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
        <nav className="level">
          {this.state.user && (
            <p className="level-item has-text-centered">
              <Link to="/roster" className="link">
                Roster
              </Link>
            </p>
          )}
          <div className="level-item has-text-centered">
            <h1>Weightless</h1>
          </div>
          {this.state.user && (
            <p className="level-item has-text-centered">
              <Link to="/leaderboard" className="link">
                Leaderboard
              </Link>
            </p>
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
    <p>
      Welcome {netlifyIdentity.currentUser()?.user_metadata.full_name}
      <button
        className="button"
        onClick={() => {
          netlifyAuth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
);

export default App;
