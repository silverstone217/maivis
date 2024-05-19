import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const job = body;
    console.log(job, "job");
    const requiredFields = [
      "fees",
      "userId",
      "jobberId",
      "description",
      "address",
      "reservationDate",
    ];
    const missingFields = requiredFields.filter((field) => !(field in job));

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

    const newReservation = await prisma.booking.create({
      data: {
        fees: job.fees,
        userId: job.userId,
        jobberId: job.jobberId,
        description: job.description,
        address: job.address,
        reservationDate: job.reservationDate,
      },
    });

    return NextResponse.json({
      error: false,
      message: "Votre offre a été envoye!",
      data: newReservation,
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
