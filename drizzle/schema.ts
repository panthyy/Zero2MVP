import {
  boolean,
  mysqlTable,
  text,
  timestamp,
  uniqueIndex,
  bigint,
  varchar,
  int,
  check,
  mysqlEnum,
  serial,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable(
  "users",
  {
    id: varchar("id", { length: 12 }).primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    emailVerified: boolean("email_verified").default(false),
    image: text("image").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    uniqueEmail: uniqueIndex("email_index").on(table.email),
  })
);

export const accounts = mysqlTable(
  "accounts",
  {
    id: serial("id").primaryKey(),
    userId: varchar("user_id", { length: 12 }),
    type: varchar("type", { length: 255 }).notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", { length: 255 }).notNull(),
    refreshToken: varchar("refresh_token", { length: 255 }),
    accessToken: varchar("access_token", { length: 255 }),
    expiresAt: bigint("expires_at", { mode: "bigint" }),
    tokenType: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    idToken: text("id_token"),
    sessionState: varchar("session_state", { length: 255 }),
    oauthTokenSecret: varchar("oauth_token_secret", { length: 255 }),
    oauthToken: varchar("oauth_token", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    userIndex: uniqueIndex("user_id").on(table.userId),
  })
);

export const sessions = mysqlTable(
  "sessions",
  {
    id: serial("id").primaryKey(),
    userId: varchar("user_id", { length: 12 }),
    expires: timestamp("expires").notNull(),
    sessionToken: varchar("session_token", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    sessionTokenIndex: uniqueIndex("session_token").on(table.sessionToken),
    userIndex: uniqueIndex("user_id").on(table.userId),
  })
);

export const verificationTokens = mysqlTable(
  "verification_tokens",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull().primaryKey(),
    expires: timestamp("expires").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => ({
    tokenIndex: uniqueIndex("token").on(table.token),
  })
);
