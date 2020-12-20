import { APIGatewayEvent, Context, Handler, Callback } from "aws-lambda";
import {Client, query } from 'faunadb';




// Instantiate the GoTrue auth client with an optional configuration
// interface User {
//   userId:string;
//   name:string;
// }
export const handler: Handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  const client = new Client({
    secret: process.env.FAUNADB_SERVER_SECRET as string,
  });
  const response = await client.query(query.Map(query.Paginate(query.Match(query.Index('all_users'))), query.Lambda('userRef', query.Get(query.Var('userRef')))));
  const clientContext = context.clientContext as any;
  const user = clientContext["user"];
  if (user) {
    let res = response as any;
    console.log(res.data);


    const users = res.data.map((row:any) => ({
      userId: row.data.userId,
      name: row.data.name,
    }));
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({ users: users }),
    });
  } else {
    callback(null, {
      statusCode: 401
    })
  }
};
