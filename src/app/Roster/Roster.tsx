import "./Roster.scss";

import React from "react";
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
    const challengers = this.challengers.map((challenger) => (
      <div className="card" key={challenger.userId}>
        <div className="card-content">
          <div className="content">
            <p className="title is-4">{challenger.name}</p>
          </div>
        </div>
      </div>
    ));

    return (
      <div>
        <header>
          <h2>Roster</h2>
        </header>
        <div className="challengers">{challengers}</div>
      </div>
    );
  }
}
