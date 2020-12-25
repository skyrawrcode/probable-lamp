import "./Leaderboard.scss";

import React from "react";
import { LeaderboardService } from "../Services/LeaderboardService";
import { Leaderboard as LeaderboardStruct } from "../../models/Leaderboard";

export class Leaderboard extends React.Component<
  {},
  { leaderboard: LeaderboardStruct; loaded: boolean }
> {
  /**
   *
   */
  constructor(prop: {}) {
    super(prop);
    this.state = { leaderboard: { top: [] }, loaded: true };
  }
  loadScores = () => {
    const loadingScores = async () => {
      const leaderboard = await LeaderboardService.getLeaderboard();
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

    const leaderboardRows = leaderboard.top?.map((entry, index) => (
      <tr className="leaderboard-list" key={entry.userId}>
        <td className="">
          <div>
            <p className="title">{index + 1}.</p>
          </div>
        </td>
        <td className="">
          <div>
            <p className="title">{entry.name}</p>
          </div>
        </td>
        <td className=" has-text-right">
          <div>
            <p className="title">{(entry.percentage * 100).toFixed(2)}%</p>
          </div>
        </td>
      </tr>
    ));

    return (
      <div className="leaderboard">
        <header className="has-text-centered">
          <h2 className="page-heading">Leaderboard</h2>
        </header>
        <div className="scores">
          <div className="card">
            <div className="card-content">
              <table className="table">
                <thead>
                  <tr>
                    <td>
                      <p className="heading">Rank</p>
                    </td>
                    <td>
                      <p className="heading">Name</p>
                    </td>
                    <td>
                      <p className="heading has-text-right">Percentage Lost</p>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardRows}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
