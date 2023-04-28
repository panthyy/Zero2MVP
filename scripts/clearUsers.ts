import * as dotenv from "dotenv";
import { readdirSync, readFileSync } from "fs";
import { connect } from "@planetscale/database";
dotenv.config();

const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
};

const conn = connect(config);

conn.execute("DELETE FROM users").then(() => {
  console.log("Users cleared");
  process.exit(0);
});
