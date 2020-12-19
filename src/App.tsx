import React from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";

import netlifyIdentity, { User } from "netlify-identity-widget";
import { Home } from "./Home/Home";
import { Scores } from "./Scores/Scores";

export const netlifyAuth = {
 
  user: null as any,

  authenticate(callback: (user: User) => any) {

    netlifyIdentity.open();
    netlifyIdentity.on("login", (user) => {
      this.user = user;
      callback(user);
    });
  },

  signout(callback: () => any) {
    netlifyIdentity.logout();
    netlifyIdentity.on("logout", () => {
      this.user = null;
      callback();
    });
  },
};

function App() {
  return (
    <Router>
      <AuthButton />
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/scores">Scores</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
      <Switch>
        <PrivateRoute path="/scores" component={Scores} />
        <Route path="/login" component={Login}/>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
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

function PrivateRoute({
  component: Component,
  ...rest
}: {
  component: any;
  [key: string]: any;
}) {
 
  return (
    <Route
      {...rest}
      render={(props) =>{
        
        return netlifyIdentity.currentUser() != null ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
      }
    />
  );
}

class Login extends React.Component<{ location?: any }> {
  state = { redirectToReferrer: false };
  /**
   *
   */
 

  login = () => {
    netlifyAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };

  render() {
    let { from } = this.props?.location?.state || { from: { pathname: "/" } };
    let { redirectToReferrer } = this.state;

    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}
export default App;
