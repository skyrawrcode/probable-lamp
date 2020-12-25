import "./Roster.scss";

import React from "react";

import ReactWordcloud, {OptionsProp} from 'react-wordcloud';
import {UserService} from "../Services/UserService"

interface Challenger {
  userId: string;
  name: string;
}

export class Roster extends React.Component<
  any,
  { challengers: Challenger[], loaded: boolean; }
> {
  service: UserService;
  get challengers() {
    return this.state.challengers;
  }

  /**
   *
   */
  constructor(props: any) {
    super(props);
    this.state = {
      challengers: [],
      loaded: false
    };
    this.service = new UserService();

  }

  loadChallengers() {
    const loadChallengers = async () => {
      const users = await this.service.getUsers()
      const usersJson = await users.json();
      this.setState({ challengers:  usersJson.users, loaded: true});
    };

    loadChallengers();
  }

  componentDidMount() {
    this.loadChallengers();
  }

  render() {
    const challengers = this.challengers.map((challenger) => ({text: challenger.name, value: 1}));
    challengers.push({value:1, text: "Derrick"})
    const options: OptionsProp = {
      spiral: "archimedean",
      deterministic: false,
      rotations: 3
    };
    return (
      <div className="roster">
        <header>
          <h2 className="page-heading">Roster</h2>
        </header>
        <div className="challengers">
          <ReactWordcloud words={challengers} options={options}/>
          
        </div>
      </div>
    );
  }
}
