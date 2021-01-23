
import netlifyIdentity from "netlify-identity-widget";

export class UserService {
    /**
     *
     */
    // constructor() {
    //     super();
        
    // }

    async getUser(userId: string) {
        return await fetch(`functions/users/?userId=${userId}`
            , {headers: this.getHeaders()})
    }

    async getUsers() {
        this.getUser("1");
        return await fetch("functions/users/", {headers: this.getHeaders()});
    }


    private getHeaders() {
        return new Headers({
            "Content-Type": "application/json",
            "Authorization": `Bearer ${netlifyIdentity.currentUser()?.token?.access_token}`,
          });
    }
}