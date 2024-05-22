import React from "react";
import { ReservationsType } from "./ReservationComponent";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { StatusRenderComponent } from "../dashboard/ActivitiesComponent";
import { useRouter } from "next/navigation";

type Props = {
  reservation: ReservationsType;
};

const ReservationsList = ({ reservation }: Props) => {
  const { jobber } = reservation;

  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();

  if (!user) {
    return null;
  }

  return (
    <div
      onClick={() => {
        router.push(`/reservations/${reservation.id}`);
      }}
      //   href={`/reservations/${reservation.id}`}
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
          <div
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/services/${jobber.user.id}`);
            }}
          >
            <h2
              className="font-bold line-clamp-1 flex-1 text-sm hover:underline
             transition-all duration-300 ease-in-out"
            >
              {jobber.user.name}
            </h2>
          </div>
          {/* <div
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/services?job=${jobber.job}`);
            }}
          > */}
          <p
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/services?job=${jobber.job}`);
            }}
            className=" bg-gradient-to-r from-green-700 
            via-green-600 to-green-400 text-transparent hover:underline 
            hover:opacity-80
             bg-clip-text line-clamp-1 transition-all duration-300 ease-in-out"
          >
            {jobber.job}
          </p>
          {/* </div> */}

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
    </div>
  );
};

export default ReservationsList;
