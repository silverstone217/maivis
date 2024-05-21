import { useSession } from "next-auth/react";
import React, { useEffect, useMemo, useState } from "react";
import { IndexTabValue } from "./MainDashBoardComp";
import { User, Booking as PrismaBooking, Jobber } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { Check, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  setIndexTab: React.Dispatch<React.SetStateAction<IndexTabValue>>;
};

export type BookingType = PrismaBooking & {
  user: User;
  jobber: Jobber;
};

const ActivitiesComponent = ({ setIndexTab }: Props) => {
  const { data: session } = useSession();
  const user = session?.user;

  const [reservations, setReservations] = useState<BookingType[]>([]);
  const [reservationData, setReservationData] = useState<BookingType | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMyData = async () => {
      try {
        console.log("infinite loading");
        const jobberId = user?.id;
        if (!jobberId) return;
        setLoading(true);

        const response = await fetch(`/api/reservation/retrieve`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (data.error === true) {
          console.log(data.message);
          setReservations([]);
          setLoading(false);
          return;
        }

        setReservations(data.data);
        setLoading(false);
      } catch (error) {
        const err = error as Error;
        const message = err.message;
        console.log(message);
      }
    };

    return () => {
      getMyData();
    };
  }, [user?.id]);

  const reservationsData = useMemo(() => reservations, [reservations]);

  //   if (!user) return null;

  if (loading) {
    return <div className="p-2 text-center font-semibold">chargement...</div>;
  }

  if (!reservationsData && !loading) {
    return (
      <div className="p-2 text-center font-semibold text-xl">
        <h2>Aucune activité trouvée</h2>
      </div>
    );
  }

  return (
    <>
      <span>
        reservations : {reservationsData.length} --- {reservations.length}
      </span>
      <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-5">
        {reservationsData.length > 0 &&
          reservationsData.map((reservation) => (
            <ReservationItem
              reservation={reservation}
              key={reservation.id}
              setReservationData={setReservationData}
            />
          ))}
      </div>
      <ViewReservationItem
        reservationData={reservationData}
        setReservationData={setReservationData}
      />
    </>
  );
};

type PropsActivity = {
  reservation: BookingType;
  setReservationData: React.Dispatch<React.SetStateAction<BookingType | null>>;
};

type PropsActivityPopup = {
  reservationData: BookingType | null;
  setReservationData: React.Dispatch<React.SetStateAction<BookingType | null>>;
};

const ViewReservationItem = ({
  reservationData,
  setReservationData,
}: PropsActivityPopup) => {
  if (!reservationData) return null;

  return (
    <div
      onClick={() => setReservationData(null)}
      className="absolute z-40 w-full h-full flex items-center justify-center 
      top-0 left-0 bg-overlay1 transition-all duration-300 ease-in-out"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-secondary relative p-4 w-full 
        box-border border shadow-xl max-w-lg min-h-40 flex 
        items-center justify-center flex-col gap-2 
        transition-all duration-300 ease-in-out
        animate-fade-in
        "
      >
        <div className="w-full p-2 box-border transition-all duration-300 ease-in-out">
          <div className="w-full flex flex-col gap-4 items-start justify-start transition-all duration-300 ease-in-out">
            {/* image and infos */}
            <div className="w-full flex gap-4 items-start justify-start box-border py-2 border-b">
              {/* image */}
              <Image
                src={
                  reservationData.user.image
                    ? reservationData.user.image
                    : "https://github.com/shadcn.png"
                }
                alt="image user"
                width={2000}
                height={2000}
                priority
                className="size-10 object-cover rounded"
              />

              <div className="box-border text-xs capitalize flex flex-col items-start flex-1 gap-[0.2rem]">
                <h2 className="font-bold line-clamp-1 flex-1 text-sm">
                  {reservationData.user.name}
                </h2>
                <p className="line-clamp-1">+243-{reservationData.user.tel}</p>

                <p className="line-clamp-1">{reservationData.address}</p>
              </div>
            </div>

            <div className="text-xs flex flex-col items-start gap-1 capitalize">
              <p>
                Status :{" "}
                <strong>
                  <StatusRenderComponent status={reservationData.status} />
                </strong>
              </p>
              <p>{reservationData.description}</p>
            </div>

            {/* accept */}
            <div className="flex w-full items-end justify-between gap-2 box-border">
              <span className="text-xs opacity-70">
                {new Date(reservationData.reservationDate).toLocaleDateString(
                  "Fr-fr",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </span>
              {reservationData.status === "en attente" && (
                <div
                  className="flex flex-1 items-center justify-end gap-2 box-border
                 transition-all duration-300 ease-in-out"
                >
                  <Button variant={"destructive"} className="py-1 px-3">
                    <X className="size-5" />
                  </Button>
                  <Button className="py-1 px-3">
                    <Check className="size-5" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        <X
          onClick={() => setReservationData(null)}
          className="absolute right-2 top-1 size-6 z-40 cursor-pointer"
        />
      </div>
    </div>
  );
};

const ReservationItem = ({
  reservation,
  setReservationData,
}: PropsActivity) => {
  return (
    <div
      onClick={() => setReservationData(reservation)}
      className="w-full p-2 border box-border shadow cursor-pointer 
      transition-all duration-300 ease-in-out"
    >
      <div className="w-full flex flex-col gap-2 items-start justify-start">
        {/* image and infos */}
        <div className="w-full flex gap-4 items-start justify-start box-border py-2 border-b">
          {/* image */}
          <Image
            src={
              reservation.user.image
                ? reservation.user.image
                : "https://github.com/shadcn.png"
            }
            alt="image user"
            width={2000}
            height={2000}
            priority
            className="size-10 object-cover rounded"
          />

          <div className="box-border text-xs capitalize flex-1">
            <h2 className="font-bold line-clamp-1 flex-1 text-sm">
              {reservation.user.name}
            </h2>

            <p className="line-clamp-1">{reservation.address}</p>
            <StatusRenderComponent status={reservation.status} />
          </div>
        </div>
        {/* accept */}
        <div className="flex w-full items-end justify-between gap-2 box-border">
          <span className="text-xs opacity-70">
            {new Date(reservation.reservationDate).toLocaleDateString("Fr-fr", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          {reservation.status === "en attente" && (
            <div className="flex flex-1 items-center justify-end gap-2 box-border transition-all duration-300 ease-in-out">
              <Button variant={"destructive"} className="py-1 px-3">
                <X className="size-5" />
              </Button>
              <Button className="py-1 px-3">
                <Check className="size-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatusRenderComponent = ({
  status,
}: {
  status: string | undefined | null;
}) => {
  if (!status)
    return (
      <span className="text-xs opacity-80 font-medium transition-all duration-300 ease-in-out">
        En attente
      </span>
    );
  switch (status) {
    case "en attente":
      return (
        <span className="text-xs opacity-80 font-medium transition-all duration-300 ease-in-out">
          {status}
        </span>
      );
    case "annule":
      return (
        <span className="text-xs opacity-80 font-medium text-red-800 transition-all duration-300 ease-in-out">
          {status}
        </span>
      );
    case "accepte":
      return (
        <span className="text-xs opacity-80 font-medium text-green-800 transition-all duration-300 ease-in-out">
          {status}
        </span>
      );
    case "refuse":
      return (
        <span className="text-xs opacity-80 font-medium text-red-800 transition-all duration-300 ease-in-out">
          {status}
        </span>
      );
    default:
      return (
        <span className="text-xs opacity-80 font-medium transition-all duration-300 ease-in-out">
          {status}
        </span>
      );
  }
};

export default ActivitiesComponent;
