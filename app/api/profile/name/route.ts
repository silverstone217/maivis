import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, userId } = body;

  try {
    if (!name || !userId) {
      return NextResponse.json(
        { error: true, message: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    const userExists = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userExists) {
      return NextResponse.json(
        { error: true, message: "Not authorized!" },
        { status: 401 }
      );
    }

    const updateUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: name,
      },
    });

    const { password, ...rest } = updateUser;

    return NextResponse.json({
      error: false,
      message: "Modifié avec success!",
      data: rest,
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
