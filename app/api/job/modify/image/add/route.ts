import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const job = body;
    console.log(job, "job");
    const requiredFields = ["userId", "urlImg"];
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
        userId: job.userId,
      },
    });

    if (!jobExists) {
      return NextResponse.json(
        {
          error: true,
          message: "Impossible d'executer cette action!",
        },
        { status: 400 }
      );
    }

    if (jobExists.images.length > 4) {
      return NextResponse.json(
        {
          error: true,
          message: "Vous ne pouvez pas ajouter plus de 4 images!",
        },
        { status: 400 }
      );
    }

    const images = [...jobExists.images, job.urlImg];

    const updateJob = await prisma.jobber.update({
      where: {
        userId: job.userId,
      },
      data: {
        images: images,
      },
    });
    return NextResponse.json({
      error: false,
      message: "L'image a été ajouté!",
      data: updateJob,
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
