import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, userId, password } = body;

  try {
    if (!email || !userId || !password) {
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
    if (!userExists.password) {
      return NextResponse.json(
        { error: true, message: "Not authorized!" },
        { status: 401 }
      );
    }

    const verifiedPassword = await compare(password, userExists.password);

    if (!verifiedPassword) {
      return NextResponse.json(
        { error: true, message: "Mot de passe est incorrect!" },
        { status: 401 }
      );
    }

    const updateUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        email: email,
      },
    });

    const { password: pass, ...rest } = updateUser;

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
