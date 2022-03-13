import { Client } from "faunadb";

export const fauna = new Client({
  secret: process.env.FAUNADB_SECRET,
  domain: "db.fauna.com",
  port: 443,
  scheme: "https",
});
