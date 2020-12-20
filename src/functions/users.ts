import { APIGatewayEvent, Context, Handler, Callback } from "aws-lambda";
import { Pool, PoolConfig } from "pg";

const config: PoolConfig = {
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DBNAME,
  password: process.env.DBPASS,
  port: +(process.env.DBPORT || 5432),
  idleTimeoutMillis: 0,
  max: 10000,
};
const pool: Pool = new Pool(config);

// Instantiate the GoTrue auth client with an optional configuration

export const handler: Handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  let client = await pool.connect();
  const clientContext = context.clientContext as any;
  const user = clientContext["user"];
  if (user) {
    let res = await client.query("SELECT userid, name from users");
    client.release();
    const users = res.rows.map((row) => ({
      userId: row.userid,
      name: row.name,
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
