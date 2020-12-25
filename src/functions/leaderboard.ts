import { gql } from "@apollo/client/core";
import { APIGatewayEvent, Context, Handler, Callback } from "aws-lambda";
import { FaunaGraphClient } from "../FaunaGraphClient";
import { Leaderboard } from "../models/Leaderboard";


async function getLeaderboard(
  _: APIGatewayEvent,
  context: Context,
  callback: Callback
) {
  const query = gql`
query {
  leaderboard(size:10) {
    top: data 
    {
      userId
      name
      percentage
      ref
    }
  }
}
  `;

  const response = await FaunaGraphClient.query<{leaderboard: Leaderboard}>({
    query: query,
  });

  const leaderboard = response.data.leaderboard;
  callback(null, { statusCode: 200, body: JSON.stringify(leaderboard) });
}
export const handler: Handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  switch (event.httpMethod) {
    case "GET":
      await getLeaderboard(event, context, callback);
      break;
    default:
      await getLeaderboard(event, context, callback);
      break;
  }
};
