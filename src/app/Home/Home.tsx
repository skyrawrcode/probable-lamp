import "./Home.scss";
import React from "react";
import { netlifyAuth } from "../NetlifyAuth";
import { Redirect } from "react-router-dom";
import { User } from "netlify-identity-widget";
import { Subscription } from "rxjs";

interface HomeState {
  redirectToReferrer:boolean;
  user: User | null;
}

export class Home extends React.Component<{ location?: any }, HomeState> {
  state = { redirectToReferrer: false, user: null };
  userSubscription: Subscription | null = null;
  componentDidMount() {
    this.userSubscription = netlifyAuth.user$.subscribe((user) => {
      this.setState((prevState) => ({ ...prevState, user: user }));
    });
  }

  componentWillUnmount() {
    
    this.userSubscription?.unsubscribe();
  }

  login = () => {
    netlifyAuth.authenticate(() => {
      this.setState((prevState) => ({ ...prevState, redirectToReferrer: true  }));
    });
  };

  render() {
    let { from } = this.props?.location?.state || { from: { pathname: "/" } };
    let { redirectToReferrer, user } = this.state;

    if (user) return <Redirect to="/scores" />;
    if (redirectToReferrer) return <Redirect to={from} />;

    return (
      <div className="Home">
        <header>
          <h1>Skogman Weightloss Challenge</h1>
        </header>
        <div>
          <button className="button is-large is-primary" onClick={this.login}>
            Login
          </button>
        </div>
      </div>
    );
  }
}
