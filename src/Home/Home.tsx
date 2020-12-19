import "./Home.scss";
import React from "react";
import { netlifyAuth } from "../App";

export class Home extends React.Component {
  
  login = () => {
    netlifyAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };
  
  render() {
    return (
      <div className="Home">
        <header>
          <h1>Skogman Weightloss Challenge</h1>
        </header>
        <div>
        <button className="button is-large is-primary" onClick={this.login}>Login</button>
        </div>
      </div>
    );
  }
}
