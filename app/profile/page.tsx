import ProfileComponent from "@/components/profile/ProfileComponent";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const getProfile = async (id: string) => {
  const myProfile = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      image: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      jobber: true,
      role: true,
      tel: true,
      emailVerified: true,
    },
  });
  return myProfile;
};

const page = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect("/sign-in");
  }
  const myProfile = await getProfile(user.id);

  if (!myProfile) {
    redirect("/sign-in");
  }

  return (
    <div className="w-full flex flex-col items-center justify-between p-4 ">
      <div className="mt-20" />
      <ProfileComponent myProfile={myProfile} />
    </div>
  );
};

export default page;
