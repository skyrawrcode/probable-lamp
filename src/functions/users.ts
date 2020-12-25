import { gql } from "@apollo/client/core";
import { APIGatewayEvent, Context, Handler, Callback } from "aws-lambda";
import { FaunaGraphClient } from "../FaunaGraphClient";

// // Instantiate the GoTrue auth client with an optional configuration
interface User {
  userId: string;
  name: string;
}
function compare(a: User, b: User) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

async function getUsers(
  _: APIGatewayEvent,
  context: Context,
  callback: Callback
) {
  const query = gql`
    query {
      allUsers {
        data {
          _id,
          userId,
          name
        }
      }
    }
  `;
  const response = await FaunaGraphClient.query<{ allUsers: { data: User[] } }>(
    { query: query }
  );

  const res = response.data.allUsers.data.sort(compare);
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ users: res }),
  });
}

export const handler: Handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  const clientContext = context.clientContext as any;
  const user = clientContext["user"];
  if (user) {
    switch (event.httpMethod) {
      case "GET":
        await getUsers(event, context, callback);
        break;
      default:
        await getUsers(event, context, callback);
        break;
    }
  } else {
    callback(null, {
      statusCode: 401,
    });
  }
};
