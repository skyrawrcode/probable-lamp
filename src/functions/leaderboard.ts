import { gql } from "@apollo/client/core";
import { APIGatewayEvent, Context, Handler, Callback } from "aws-lambda";
import { FaunaGraphClient } from "../FaunaGraphClient";
// import { query } from "faunadb";

// const q = query;

// // Instantiate the GoTrue auth client with an optional configuration
// interface User {
//   userId: string;
//   name: string;
// }
interface QueryCurrentWeightsPage {
  currentWeights: QueryCurrentWeightsPage
}


interface QueryCurrentWeightsPage {
  data: [{
    currentWeight: number,
    user: {
      name: string;
      initialWeight: number;
    }
  }]
}


async function getLeaderboard(
  _: APIGatewayEvent,
  context: Context,
  callback: Callback
) {
  const query = gql`
    query {
      currentWeights {
        data {
          currentWeight: weight
          user {
            name
            initialWeight
          }
        }
      }
    }
  `;

  const response = await FaunaGraphClient.query<QueryCurrentWeightsPage>({
    query: query,
  });

  console.log(response.data);
  const leaderBoard = response.data.currentWeights.data
    .map((a) => {
      const currentWeight = a.currentWeight;
      const user = a.user;
      const percentage =  (user.initialWeight- currentWeight) / user.initialWeight;
      return { 
        userName: user.name,
        percentage: percentage};
      
    })
    .sort((a: any, b: any) => -(a.percentage - b.percentage));

  callback(null, { statusCode: 200, body: JSON.stringify({leaderBoard: leaderBoard}) });
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
