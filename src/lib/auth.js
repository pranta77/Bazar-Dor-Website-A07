// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "@better-auth/mongo-adapter";

// const client = new MongoClient(process.env.MONGODB_DB_URL);
// const db = client.db("bazar dor web app");

// export const auth = betterAuth({
//   emailAndPassword: {
//     enabled: true,
//   },
//   database: mongodbAdapter(db, {
//     client,
//   }),
// });

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGO_DB_URL);

const db = client.db("bazar_dor_web_app");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_Client_ID,
      clientSecret: process.env.GOOGLE_Client_SECRET,
    },
  },

  database: mongodbAdapter(db, {
    client,
  }),
});
