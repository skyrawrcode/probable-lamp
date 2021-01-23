import "./Home.scss";
import { FunctionComponent, useEffect, useState } from "react";
import { netlifyAuth } from "../NetlifyAuth";
import { Redirect } from "react-router-dom";
import { User } from "netlify-identity-widget";
import { Subscription } from "rxjs";

interface HomeState {
  redirectToReferrer: boolean;
  user: User | null;
}

export const Home: FunctionComponent = (props: any) => {
  const initialState: HomeState = { redirectToReferrer: false, user: null };
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const userSubscription: Subscription = netlifyAuth.user$.subscribe(
      (user) => {
        setState((prevState) => ({ ...prevState, user: user }));
      }
    );

    return function cleanup() {
      userSubscription?.unsubscribe();
    };
  }, []);

  function login() {
    netlifyAuth.authenticate(() => {
      setState((prevState) => ({
        ...prevState,
        redirectToReferrer: true,
      }));
    });
  }

  let { from } = props?.location?.state || { from: { pathname: "/" } };
  let { redirectToReferrer, user } = state;

  if (user) return <Redirect to="/leaderboard" />;
  if (redirectToReferrer) return <Redirect to={from} />;

  return (
    <div className="Home">
      <header>
        <h1>Skogman Weightloss Challenge</h1>
      </header>
      <div>
        <button className="button is-large is-primary" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
};
