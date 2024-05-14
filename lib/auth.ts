import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { prisma } from "./prisma";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@mail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const existingUser = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!existingUser) {
          throw new Error("Email is invalid, try another or sign up!");
        }

        if (!existingUser?.password) return null;

        const passwordMatch = await compare(
          credentials.password,
          existingUser?.password
        );

        if (!passwordMatch) {
          throw new Error("Invalid password!");
        }

        const { password: pwd, ...rest } = existingUser;

        return rest;
      },
    }),

    GoogleProvider({
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET_KEY,
  debug: process.env.NODE_ENV === "development",

  callbacks: {
    async jwt({ token, user, profile }) {
      if (user) {
        return {
          ...token,
          ...profile,
        };
      }
      return token;
    },

    async session({ session, user, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          name: token.name,
          // id : token.id,
          // role : token.role,
          ...user,
        },
      };
    },
  },
};
