import "./Challengers.scss";

import React from "react";

// import { netlifyAuth } from "../App";

// import netlifyIdentity, { User } from "netlify-identity-widget";

// function timeout(ms:number) () {
//     return new Promise()
// }
interface Challenger{
    userId: string;
    name: string;
}

export class Challengers extends React.Component<any, {challengers: Challenger[]}> {
  /**
   *
   */
  constructor(props:any) {
    super(props);
    this.state = {
      challengers: [],
    };
  }

  loadChallengers() {
    const loadChallengers = async () => {
      const users = await fetch(".netlify/functions/users");
        
      this.setState({ challengers: await users.json() });
    };

    loadChallengers();
  }

  componentDidMount() {
    this.loadChallengers();
  }

  render() {
    const challengers = this.state.challengers.map((challenger) => (
      <div className="card">
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                <img
                  src="https://bulma.io/images/placeholders/96x96.png"
                  alt="Placeholder imsage"
                />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-4">{challenger.name}</p>
            </div>
          </div>
        </div>
      </div>
    ));

    return (
      <div className="Home">
        <header>
          <h1>Skogman Weightloss Challenge</h1>
        </header>
        <div className="challengers">{challengers}</div>
      </div>
    );
  }
}
