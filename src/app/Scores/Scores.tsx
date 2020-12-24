import "./Scores.scss";

import React, {  } from "react";

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
      <div>
        <header>
          <h1>Leaderboard</h1>
        </header>
        <div className="scores">
          <div className="card">
            <div className="card-content">
              <ol type="1">

              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
