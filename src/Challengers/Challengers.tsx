import "./Challengers.scss";

import React from "react";

// import { netlifyAuth } from "../App";

import netlifyIdentity from "netlify-identity-widget";

// function timeout(ms:number) () {
//     return new Promise()
// }
interface Challenger {
  userId: string;
  name: string;
}

export class Challengers extends React.Component<
  any,
  { challengers: Challenger[] }
> {
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
    };
  }

  loadChallengers() {
    const loadChallengers = async () => {
      const users = await fetch("functions/users", {
        headers: new Headers({
          "Content-Type": "application/json",
          "Authorization": `Bearer ${netlifyIdentity.currentUser()?.token?.access_token}`,
        } as any), 
      });
      const usersJson = await users.json();

      this.setState({ challengers: usersJson.users });
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
          <p className="title is-4">{challenger.name}</p>
        </div>
      </div>
    ));

    return (
      <div>
        <header>
          <h1>Skogman Weightloss Challenger</h1>
        </header>
        <div className="challengers">{challengers}</div>
      </div>
    );
  }
}
