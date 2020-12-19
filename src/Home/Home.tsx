import "./Home.scss";
import React from "react";

export class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <header>
          <h1>Skogman Weightloss Challenge</h1>
        </header>
        <div>
        <button className="button is-large is-primary">Login</button>
        </div>
      </div>
    );
  }
}
