import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const job = body;
    console.log(job, "job");
    const requiredFields = [
      "userId",
      "jobberId",
      "description",
      "address",
      "reservationDate",
      "bookingId",
    ];
    const missingFields = requiredFields.filter((field) => !(field in job));

    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!user) {
      return NextResponse.json(
        { error: true, message: "Not authorized!" },
        { status: 403 }
      );
    }

    if (!job.userId) {
      return NextResponse.json(
        { error: true, message: "Not authorized!" },
        { status: 403 }
      );
    }
    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: true,
          message: `Les champs suivant sont réquis : ${missingFields.join(
            ", "
          )}`,
        },
        { status: 400 }
      );
    }

    const userExists = await prisma.user.findUnique({
      where: {
        id: job.userId,
      },
    });
    if (!userExists) {
      return NextResponse.json(
        { error: true, message: "Not authorized!" },
        { status: 401 }
      );
    }

    const jobExists = await prisma.jobber.findUnique({
      where: {
        id: job.jobberId,
      },
    });

    if (!jobExists || !jobExists.isAvailable) {
      return NextResponse.json(
        {
          error: true,
          message: "Ce personnel n'est plus disponible. reesayez plus tard!",
        },
        { status: 400 }
      );
    }

    const bookingExists = await prisma.booking.findUnique({
      where: {
        id: job.bookingId,
      },
    });

    if (!bookingExists) {
      return NextResponse.json(
        {
          error: true,
          message: "Cette réservation n'existe pas!",
        },
        { status: 400 }
      );
    }

    if (
      bookingExists.status === "annule" ||
      bookingExists.status === "refuse" ||
      bookingExists.status === "termine"
    ) {
      return NextResponse.json(
        {
          error: true,
          message: "Cette réservation n'est plus etre modifiée!",
        },
        { status: 400 }
      );
    }

    const updateReservation = await prisma.booking.update({
      where: {
        id: job.bookingId,
      },

      data: {
        description: job.description,
        address: job.address,
        reservationDate: job.reservationDate,
      },
    });

    return NextResponse.json({
      error: false,
      message: "Votre offre a été modifié!",
      data: updateReservation,
    });
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
    return NextResponse.json(
      { error: true, message: err.message },
      { status: 500 }
    );
  }
}
