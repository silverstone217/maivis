import ViewItem from "@/components/services/ViewItem";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession, User } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export const getService = async (id: string) => {
  const service = await prisma.user.findUnique({
    where: {
      jobber: {
        NOT: undefined,
      },

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
    },
  });

  return service;
};

const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!id) {
    redirect("/services");
  }
  if (user?.id === id) {
    redirect(`/dashboard/${id}`);
  }

  const service = (await getService(id)) as unknown as User;

  return (
    <div>
      <div className="mt-20" />
      <ViewItem service={service} />
    </div>
  );
};

export default page;
