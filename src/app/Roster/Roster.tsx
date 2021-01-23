import "./Roster.scss";

import React, { FunctionComponent, useEffect, useState } from "react";

import ReactWordcloud, { OptionsProp } from "react-wordcloud";
import { UserService } from "../Services/UserService";

interface Challenger {
  userId: string;
  name: string;
}

export const Roster: FunctionComponent = () => {
  const wordcloudOptions: OptionsProp = {
    spiral: "archimedean",
    deterministic: false,
    rotations: 3,
    enableTooltip: false,
  };

  const defaultState: {
    challengers: Challenger[];
    loaded: boolean;
  } = {
    challengers: [],
    loaded: false,
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
    <div className="">
      <h2 className="sr-only">Roster</h2>
      <div className="sm:mx-0 mx-2">
        <ReactWordcloud words={challengers} options={wordcloudOptions} />
      </div>
    </div>
  );
};
