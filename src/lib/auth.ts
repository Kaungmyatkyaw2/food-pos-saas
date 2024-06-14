import { db } from "@/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { AuthOptions, DefaultSession, getServerSession } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GOOGLE_AUTH_PROVIDER from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      isAdmin?: boolean;
    } & DefaultSession["user"];
  }
}

export const authOptions: AuthOptions = {
  adapter: DrizzleAdapter(db) as Adapter,
  session: {
    strategy: "jwt",
  },
  providers: [
    GOOGLE_AUTH_PROVIDER({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "crednetials",
      credentials: {
        email: {
          label: "email:",
          type: "text",
          placeholder: "your-email",
        },
        password: {
          label: "password:",
          type: "password",
          placeholder: "your-password",
        },
      },
      async authorize(credentials, req) {
        const dbUser = await db.query.users.findFirst({
          where: (users, { eq }) => eq(users.email, credentials?.email!),
        });

        if (!dbUser) {
          throw new Error("User doesn't exist");
        }

        const isPasswordMatch = await bcrypt.compare(
          credentials?.password!,
          dbUser?.password!
        );

        if (!isPasswordMatch) {
          throw new Error("Invalid Password!");
        }

        return dbUser;
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (account?.provider !== "credentials") {
        return true;
      }

      return true;
    },
    async jwt({ token }) {
      const dbUser = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, token.email!),
      });

      if (!dbUser) {
        throw new Error("No user is found with this email!");
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        isAdmin: dbUser.isAdmin,
      };
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name,
          email: token.email,
          image: token.picture,
          isAdmin: !!token.isAdmin,
        };
      }

      return session;
    },
  },
} satisfies AuthOptions;

export function getSession() {
  return getServerSession(authOptions);
}
