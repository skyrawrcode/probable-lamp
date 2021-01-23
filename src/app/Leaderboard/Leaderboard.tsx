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
        <th className="" scope="row">
          {index + 1}.
        </th>
        <td className="">{entry.name}</td>
        <td className="text-right">{(entry.percentage * 100).toFixed(2)}%</td>
      </tr>
    ));

    return (
      <div className="leaderboard">
        <header className="text-center">
          <h2 className="page-heading">Leaderboard</h2>
        </header>
        <div className="scores">
          <div className="card">
            <div className="card-content">
              <table className="table">
                <thead>
                  <tr>
                    <th className="whitespace-nowrap">Rank</th>
                    <th className="whitespace-nowrap">Name</th>
                    <th className="whitespace-nowrap text-center">
                      Percentage Lost
                    </th>
                  </tr>
                </thead>
                <tbody>{leaderboardRows}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
