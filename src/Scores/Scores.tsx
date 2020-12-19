import "./Scores.scss";

import React, { FunctionComponent } from "react";

import { netlifyAuth } from "../App";

import netlifyIdentity, { User } from "netlify-identity-widget";

export class Scores extends React.Component {
  loadScores = () => {
    const loadingScores = async () => {
      this.setState({ scores: [] });
    };

    loadingScores();
  };

  componentDidMount() {
    this.loadScores();
  }

  render() {
    return (
      <div className="Home">
        <header>
          <h1>Skogman Weightloss Challenge</h1>
        </header>
        <div className="scores">
          <div className="card">
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <figure className="image is-48x48">
                    <img
                      src="https://bulma.io/images/placeholders/96x96.png"
                      alt="Placeholder imsage"
                    />
                  </figure>
                </div>
                <div className="media-content">
                  <p className="title is-4">John Smith</p>
                  <p className="subtitle is-6">@johnsmith</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
