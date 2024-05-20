import MainDashBoardComp from "@/components/dashboard/MainDashBoardComp";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const getJob = async (id: string) => {
  const job = await prisma.jobber.findUnique({
    where: {
      userId: id,
    },
  });

  return job;
};

const page = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    redirect("/sign-in");
  }
  const id = user.id;

  if (!id) redirect("/sign-in");

  const myJob = await getJob(id);

  return (
    <main className="flex w-full flex-col items-center justify-between p-4 overflow-x-hidden pt-14">
      <div className="max-w-7xl w-full mx-auto space-y-10 lg:space-y-16 overflow-x-hidden flex items-center">
        <div className="mt-6" />
        <MainDashBoardComp myJob={myJob} />
      </div>
    </main>
  );
};

export default page;
