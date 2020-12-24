import netlifyIdentity, { User } from "netlify-identity-widget";
import { BehaviorSubject } from "rxjs";


export class NetlifyAuth {
  get user$() {
    return this.userSubject.asObservable();
  }
  private userSubject = new BehaviorSubject<User | null>(null);
  /**
   *
   */
  constructor() {
    const currentUser = netlifyIdentity.currentUser();

    if (currentUser) {
      this.userSubject.next(currentUser);
    }

    netlifyIdentity.on("init", (user) => {
      this.userSubject.next(user);
    });
  }

  authenticate(callback: (user: User) => any) {
    netlifyIdentity.open();
    netlifyIdentity.on("login", (user) => {
      this.userSubject.next(user);
      callback(user);
    });
  }

  signout(callback: () => any) {
    netlifyIdentity.logout();
    netlifyIdentity.on("logout", () => {
      this.userSubject.next(null);
      callback();
    });
  }
}

export const netlifyAuth = new NetlifyAuth();