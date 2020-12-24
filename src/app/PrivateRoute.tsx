import { Route, Redirect } from "react-router-dom";
import netlifyIdentity from "netlify-identity-widget";

export function PrivateRoute({
  component: Component,
  ...rest
}: {
  component: any;
  [key: string]: any;
}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        return netlifyIdentity.currentUser() != null ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
}
