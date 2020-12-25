
import netlifyIdentity from "netlify-identity-widget";
import {Leaderboard} from "../../models/Leaderboard"
export  class LeaderboardService {
    /**
     *
     */
    // constructor() {
    //     super();
        
    // }

    static async getLeaderboard(): Promise<Leaderboard> {
        const headers = this.getHeaders();
        const response =  await fetch("functions/leaderboard", {headers: headers});
        return await response.json();
    }


    private static getHeaders() {
        return new Headers({
            "Content-Type": "application/json",
            "Authorization": `Bearer ${netlifyIdentity.currentUser()?.token?.access_token}`,
          });
    }
}