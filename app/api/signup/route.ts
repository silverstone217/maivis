import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const { email, password, name, role, phone } = body;

  try {
    if (!email || !password || !name || !role || !phone)
      return NextResponse.json({
        error: true,
        message: "Tous les champs sont requis*",
      });

    const isUserExist = await prisma.user.findUnique({
      where: { email: email },
    });

    if (isUserExist) {
      return NextResponse.json({
        error: true,
        message: "Un utilisateur avec cet email existe deja!",
      });
    } else {
      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          password: hashPassword,
          email: email,
          name: name,
          role: role,
          tel: phone,
        },
      });

      const { password: pwd, ...rest } = newUser;
      return NextResponse.json(
        {
          error: false,
          message: "Votre compte est maintenant crée!",
          data: rest,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
    return NextResponse.json(
      {
        error: true,
        message: "Oops!, Une erreur s'est produite !",
        errM: err.message,
      },
      { status: 500 }
    );
  }
}
