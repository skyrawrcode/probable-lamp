import { gql } from "@apollo/client/core";
import { APIGatewayEvent, Context, Handler, Callback } from "aws-lambda";
import { FaunaGraphClient } from "../FaunaGraphClient";
import { UserBrief, User} from "./models/User";


function compare(a: UserBrief, b: UserBrief) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

async function getUser(
  _: APIGatewayEvent,
  context: Context,
  callback: Callback
) {
  const query = gql`
    query {
      user: findUserByUserId(userId: "1") {
        ref: _id
        name
        userId
        weights {
          data {
            weight
            date
          }
        }
        currentWeight
        initialWeight
      }
    }
  `;

  const response = await FaunaGraphClient.query<{ user:  User  }>(
    { query: query }
  );

  const res = response.data.user;
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ user: res }),
  });
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
          _id
          userId
          name
        }
      }
    }
  `;
  const response = await FaunaGraphClient.query<{ allUsers: { data: UserBrief[] } }>(
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
        if (
          event.queryStringParameters &&
          event.queryStringParameters["userId"]
        ) {
          await getUser(event, context, callback);
        } else {
          await getUsers(event, context, callback);
        }
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
