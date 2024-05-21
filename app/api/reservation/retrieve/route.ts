import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const authenticated = !!session;

    console.log({ authenticated, session, src: "server retrieve" });

    if (!authenticated) {
      return NextResponse.json(
        { error: true, message: "Not authorized!" },
        { status: 401 }
      );
    }
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: true, message: "Not authorized!" },
        { status: 401 }
      );
    }

    const reservations = await prisma.booking.findMany({
      where: {
        jobber: {
          userId: user.id,
        },
      },
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
        jobber: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    console.log({
      reservations: reservations.length,
      src: "data on server retrieve data",
    });

    return NextResponse.json({
      error: false,
      data: reservations,
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
