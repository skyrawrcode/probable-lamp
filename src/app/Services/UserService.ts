
import netlifyIdentity from "netlify-identity-widget";

export class UserService {
    /**
     *
     */
    // constructor() {
    //     super();
        
    // }

    async getUsers() {
        const headers = this.getHeaders();
        return await fetch("functions/users", {headers: headers});
    
    }


    private getHeaders() {
        return new Headers({
            "Content-Type": "application/json",
            "Authorization": `Bearer ${netlifyIdentity.currentUser()?.token?.access_token}`,
          });
    }
}