export type User = {
  id: string;
  email: string | null;
  name: string | null;
  token?: string | null;
  role: string;
  tel: string;
  image: string | null;
  jobber: Jobber | null;
  emailVerified: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

import { Jobber } from "@prisma/client";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role: string;
    image: string | null;
    tel: string;
    jobber: Jobber | null;
    emailVerified: Date | null;
    createdAt: Date;
    updatedAt: Date;
  }

  interface Session {
    user: User & {
      id: string;
    };
    token: User;
  }
}
