import ViewReservationComponent, {
  ReservationType,
} from "@/components/reservations/ViewReservationComponent";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const getReservation = async (bookingId: string) => {
  const reservation = await prisma.booking.findUnique({
    where: {
      id: bookingId,
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
  });

  return reservation;
};

const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect("/sign-in");
  }

  if (!id) {
    redirect("/reservations");
  }

  const reservation = (await getReservation(id)) as unknown as ReservationType;

  return (
    <div className="min-h-[90vh]">
      <div className="mt-16" />
      <ViewReservationComponent reservation={reservation} />
    </div>
  );
};

export default page;
