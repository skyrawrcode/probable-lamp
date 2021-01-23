import "./Roster.scss";

import React, { FunctionComponent, useEffect, useState } from "react";

import ReactWordcloud, { OptionsProp } from "react-wordcloud";
import { UserService } from "../Services/UserService";

interface Challenger {
  userId: string;
  name: string;
}

export const Roster: FunctionComponent<{
  challengers: Challenger[];
  loaded: boolean;
}> = (
  defaultState = {
    challengers: [],
    loaded: false,
  }
) => {
  const wordcloudOptions: OptionsProp = {
    spiral: "archimedean",
    deterministic: false,
    rotations: 3,
    enableTooltip: false,
  };
  
  const [state, setChallengers] = useState(defaultState);

  useEffect(() => {
    const userService = new UserService();
    const fetchChallengers = async () => {
      const users = await userService.getUsers();
      const usersJson = await users.json();
      setChallengers({ challengers: usersJson.users, loaded: true });
    };
    fetchChallengers();
  }, []);

  const challengers = state.challengers.map((challenger) => ({
    text: challenger.name,
    value: 1,
  }));

  return (
    <div className="roster">
      <header>
        <h2 className="page-heading">Roster</h2>
      </header>
      <div className="challengers">
        <ReactWordcloud words={challengers} options={wordcloudOptions} />
      </div>
    </div>
  );
};
