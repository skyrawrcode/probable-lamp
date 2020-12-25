import "./Leaderboard.scss";

import React, {  } from "react";
import {LeaderboardService} from "../Services/LeaderboardService";
import {Leaderboard as LeaderboardStruct} from "../../models/Leaderboard";

export class Leaderboard extends React.Component<{}, {leaderboard: LeaderboardStruct, loaded: boolean}> {
  
/**
 *
 */
constructor(prop: {}) {
  super(prop);
  this.state= {leaderboard: {top: []}, loaded: true};
}
  loadScores = () => {
    const loadingScores = async () => {
        
      const leaderboard =  await LeaderboardService.getLeaderboard();
      this.setState({ leaderboard: await leaderboard, loaded: true });
    };

    loadingScores();
  };

  componentDidMount() {
    this.loadScores();
  }

  render() {
    if (!this.state.loaded) {
      return null;
    }

    const leaderboard = this.state.leaderboard;
    const leaderboardRows = leaderboard.top?.map(entry => (<li key={entry.userId}>{entry.name} - {entry.percentage * 100}%</li>))

    return (
      <div>
        <header>
          <h1>Leaderboard</h1>
        </header>
        <div className="scores">
          <div className="card">
            <div className="card-content">
              <ol type="1">
              {leaderboardRows}
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
