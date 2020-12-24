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
import { Scores } from "./Scores/Scores";
import { Roster } from "./Roster/Roster";
import { PrivateRoute } from "./PrivateRoute";
import { netlifyAuth } from "./NetlifyAuth";
import { Subscription } from "rxjs";

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
        <ul>
          {this.state.user && (
            <li>
              <Link to="/roster">Roster</Link>
            </li>
          )}
          {this.state.user && (
            <li>
              <Link to="/scores">Scores</Link>
            </li>
          )}
        </ul>
        <Switch>
          <PrivateRoute path="/scores" component={Scores} />
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
