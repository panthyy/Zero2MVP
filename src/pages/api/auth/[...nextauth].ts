import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { Client } from "@planetscale/database";
import GithubProvider from "next-auth/providers/github";
import buildPlanetScaleHelpers from "@/lib/authjs-adapter-mysql/src/planetscale";
import Mysql2Adapter from "@/lib/authjs-adapter-mysql/src";

const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
};

const client = new Client(config);
const psHelpers = buildPlanetScaleHelpers(client);

export const authOptions: AuthOptions = {
  adapter: Mysql2Adapter(psHelpers),
  providers: [
    GithubProvider({
      clientId: process.env!.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  pages: {
    signIn: "/signin",
    newUser: "/onboarding",
  },
};

export default NextAuth(authOptions);
