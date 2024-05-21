import { prisma } from "./prisma";

export const getMyReservations = async (id: string) => {
  "use server";
  const reservations = await prisma.booking.findMany({
    where: {
      jobberId: id,
    },
    select: {
      id: true,
      createdAt: true,
      updatedAt: true,
      address: true,
      jobber: true,
      description: true,
      fees: true,
      isViewed: true,
      jobberId: true,
      userId: true,
      reservationDate: true,
      paimentMoment: true,
      paimentOption: true,
      ratings: true,
      status: true,
    },
  });

  return reservations;
};
