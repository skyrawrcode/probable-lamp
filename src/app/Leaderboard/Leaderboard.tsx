import "./Leaderboard.scss";

import { FunctionComponent, useEffect, useState } from "react";
import { LeaderboardService } from "../Services/LeaderboardService";
import { Leaderboard as LeaderboardStruct } from "../../models/Leaderboard";

export const Leaderboard: FunctionComponent<any> = () => {
  
  const [leaderBoardData, setLeaderboardData] = useState<{
    leaderboard: LeaderboardStruct;
    loaded: boolean;
  }>({
    leaderboard: { top: [] },
    loaded: true,
  });

  useEffect(() => {
      const loadLeaderboard = async () => {
        const leaderboardResponse = await LeaderboardService.getLeaderboard(); 
        setLeaderboardData({ leaderboard: leaderboardResponse, loaded: true });
      };
      loadLeaderboard();
  }, []);

  if (!leaderBoardData.loaded) {
    return null;
  }

  const leaderboard = leaderBoardData.leaderboard;

  const leaderboardRows = leaderboard.top?.map((entry, index) => (
    <tr className="" key={entry.userId}>
      <th className="" scope="row">
        {index + 1}.
      </th>
      <td className="">{entry.name}</td>
      <td className="text-right">{(entry.percentage * 100).toFixed(2)}%</td>
    </tr>
  ));

  return (
    <div className="">
      <h2 className="sr-only">Leaderboard</h2>
      <div className="flex flex-row justify-center mt-1">
        <div className="rounded-md bg-blue-100 px-5 py-3 shadow-md flex-grow md:flex-grow-0 mx-4 md:w-96">
            <table className=" w-full">
              <thead>
                <tr>
                  <th className="whitespace-nowrap uppercase font-mono tracking-tighter">Rank</th>
                  <th className="whitespace-nowrap uppercase font-mono tracking-tighter text-left">Name</th>
                  <th className="whitespace-nowrap uppercase font-mono tracking-tighter text-right">
                    Loss(%) 
                  </th>
                </tr>
              </thead>
              <tbody>{leaderboardRows}</tbody>
            </table>
        </div>
      </div>
    </div>
  );
};
