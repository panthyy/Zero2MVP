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

const migrations = readdirSync("drizzle/migrations")
  .filter((file) => file.match(/^\d{4}_.+\.sql$/))
  .sort()
  .reduce((acc: string[], file) => {
    const content = readFileSync(`drizzle/migrations/${file}`, "utf8");
    const ddl = content.split("--> statement-breakpoint");
    return [...acc, ...ddl];
  }, []);

const runMigrations = async () => {
  for (const migration of migrations) {
    await conn.execute(migration).catch((err) => {});
  }
};

runMigrations()
  .then(() => {
    console.log("Migrations complete");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
