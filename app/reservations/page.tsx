import ReservationComponent, {
  ReservationsType,
} from "@/components/reservations/ReservationComponent";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const getReservations = async (id: string) => {
  const reservations = await prisma.booking.findMany({
    where: {
      user: {
        id: id,
      },
    },
    include: {
      jobber: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
              email: true,
              createdAt: true,
              updatedAt: true,
              tel: true,
            },
          },
        },
      },
      ratings: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return reservations;
};

const page = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect("/");
  }
  const id = user.id;
  const reservations = (await getReservations(id)) as ReservationsType[];

  return (
    <div className="min-h-[90vh]">
      <div className="mt-16" />
      <ReservationComponent reservations={reservations} />
    </div>
  );
};

export default page;
