import React from "react";
import { ReservationsType } from "./ReservationComponent";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { StatusRenderComponent } from "../dashboard/ActivitiesComponent";

type Props = {
  reservation: ReservationsType;
};

const ReservationsList = ({ reservation }: Props) => {
  const { jobber } = reservation;

  const { data: session } = useSession();
  const user = session?.user;

  if (!user) {
    return null;
  }

  return (
    <Link
      href={`/reservations/${reservation.id}`}
      className="w-full p-2 border box-border shadow cursor-pointer 
    transition-all duration-300 ease-in-out"
    >
      {/* image and infos */}
      <div className="w-full flex gap-4 items-start justify-start box-border py-2 border-b">
        {/* img */}

        {/* image */}
        <Image
          src={
            jobber.user.image
              ? jobber.user.image
              : "https://github.com/shadcn.png"
          }
          alt="image user"
          width={2000}
          height={2000}
          priority
          className="size-10 object-cover rounded"
        />

        {/* infos */}

        <div className="box-border text-xs capitalize flex flex-col items-start flex-1 gap-[0.2rem]">
          <h2 className="font-bold line-clamp-1 flex-1 text-sm">
            {jobber.user.name}
          </h2>
          <p
            className=" bg-gradient-to-r from-green-700 
            via-green-600 to-green-400 inline-block text-transparent bg-clip-text line-clamp-1"
          >
            {jobber.job}
          </p>
          <p className="line-clamp-1 opacity-80">+243-{jobber.user.tel}</p>
        </div>
      </div>
      {/* date and status */}
      <div className="flex w-full items-center justify-between box-border p-2">
        <span className="text-xs opacity-70">
          {new Date(reservation.reservationDate).toLocaleDateString("Fr-fr", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        <p className="line-clamp-1 text-sm font-medium">
          {jobber.salary}$
          {jobber?.transportFees && parseInt(jobber?.transportFees) > 0 && (
            <span className="text-xs opacity-80">
              {" "}
              / {parseInt(jobber?.transportFees)}$
            </span>
          )}
        </p>
        {/* status */}
        <StatusRenderComponent status={reservation.status} />
      </div>
    </Link>
  );
};

export default ReservationsList;
