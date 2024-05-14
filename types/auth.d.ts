export type User = {
  id: string;
  email: string | null;
  name: string | null;
  token?: string | null;
  role: string;
  image: string | null;
  emailVerified: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role: string;
    image: string | null;
    emailVerified: Date | null;
    createdAt: Date;
    updatedAt: Date;
  }

  interface Session {
    user: User & {
      id: string;
    };
    token: {
      id: string;
      role: string;
    };
  }
}
