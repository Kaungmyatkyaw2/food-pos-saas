import { db } from "@/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { Adapter } from "next-auth/adapters";
import NextAuth from "next-auth/next";
import GOOGLE_AUTH_PROVIDER from "next-auth/providers/google";

const handler = NextAuth({
  adapter: DrizzleAdapter(db) as Adapter,
  session: {
    strategy: "jwt",
  },
  providers: [
    GOOGLE_AUTH_PROVIDER({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
});

export { handler as GET, handler as POST };
