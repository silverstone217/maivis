import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const job = body;
    console.log(job, "job");
    const requiredFields = [
      "job",
      "userId",
      "description",
      "salary",
      "address",
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

    const updateJob = await prisma.jobber.update({
      where: {
        userId: job.userId,
      },
      data: {
        job: job.job,
        description: job.description,
        salary: job.salary,
        address: job.address,
      },
    });
    return NextResponse.json({
      error: false,
      message: "Votre profile a été modifié avec success!",
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
