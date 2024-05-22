import { useSession } from "next-auth/react";
import React, { useEffect, useMemo, useState } from "react";
import { IndexTabValue } from "./MainDashBoardComp";
import { User, Booking as PrismaBooking, Jobber } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { Check, X } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import SelectOptions from "../SelectOptions";
import { bookingStatusData } from "@/utils/data";
import SelectUpdateOptions from "../SelectUpdateOptions";

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
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const getMyData = async () => {
      try {
        // console.log("infinite loading");
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

        // console.log({ res: data.data });

        setReservations(data.data);
        setLoading(false);
      } catch (error) {
        const err = error as Error;
        const message = err.message;
        console.log(message);
      }
    };

    getMyData();
  }, [user?.id]);

  const reservationsData = useMemo(() => reservations, [reservations]);

  if (!user) return null;

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

  // handle submit
  const handleSubmitStatus = async (
    status: string,
    bookingId: string,
    jobberId: string
  ) => {
    try {
      setLoading(true);
      const formData = {
        status: status,
        bookingId,
        userId: user.id,
        jobberId,
      };

      const response = await fetch("/api/reservation/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.error === true) {
        toast({
          description: data.message,
          variant: "destructive",
          duration: 2000,
        });
        setTimeout(() => setLoading(false), 1500);
        return;
      }

      toast({
        description: data.message,
        variant: "default",
        duration: 2000,
      });
      setTimeout(() => setLoading(false), 1500);
      router.refresh();
    } catch (error) {
      const err = error as Error;
      toast({
        description: err.message,
        variant: "destructive",
        duration: 2000,
      });
      setTimeout(() => setLoading(false), 1500);
    }
  };

  return (
    <>
      <span className="mt-4 text-sm">
        Reservations : <strong>{reservationsData.length}</strong>
      </span>
      <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-2">
        {reservationsData.length > 0 &&
          reservationsData.map((reservation) => (
            <ReservationItem
              reservation={reservation}
              key={reservation.id}
              setReservationData={setReservationData}
              handleSubmitStatus={handleSubmitStatus}
            />
          ))}
      </div>
      <ViewReservationItem
        reservationData={reservationData}
        setReservationData={setReservationData}
        handleSubmitStatus={handleSubmitStatus}
        loading={loading}
        setLoading={setLoading}
      />
    </>
  );
};

type PropsActivity = {
  reservation: BookingType;
  setReservationData: React.Dispatch<React.SetStateAction<BookingType | null>>;
  handleSubmitStatus: (
    status: string,
    bookingId: string,
    jobberId: string
  ) => Promise<void>;
};

type PropsActivityPopup = {
  reservationData: BookingType | null;
  loading: boolean;
  setReservationData: React.Dispatch<React.SetStateAction<BookingType | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmitStatus: (
    status: string,
    bookingId: string,
    jobberId: string
  ) => Promise<void>;
};

const ViewReservationItem = ({
  reservationData,
  setReservationData,
  handleSubmitStatus,
  loading,
  setLoading,
}: PropsActivityPopup) => {
  const [status, setStatus] = useState(reservationData?.status || "");
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

            <div className="text-xs flex flex-col items-start gap-4 capitalize">
              {reservationData.status !== "accepte" && (
                <p>
                  Status :{" "}
                  <strong>
                    <StatusRenderComponent status={reservationData.status} />
                  </strong>
                </p>
              )}

              {reservationData.status === "accepte" && (
                <div className="flex flex-col items-start gap-1 w-full">
                  <p>
                    Status :{" "}
                    <strong>
                      <StatusRenderComponent status={reservationData.status} />
                    </strong>
                  </p>
                  <div className="w-full flex  gap-2 items-center justify-start">
                    <SelectOptions
                      options={bookingStatusData}
                      onChange={(e) => setStatus(e)}
                      value={status}
                      required
                      label="Status"
                      placeholder="Modifier l'etat de la reservation"
                      loading={loading}
                      setLoading={setLoading}
                    />
                    <Button
                      onClick={() => {
                        handleSubmitStatus(
                          status,
                          reservationData.id,
                          reservationData.jobberId
                        );
                        setReservationData(null);
                      }}
                      variant={"outline"}
                      disabled={
                        loading ||
                        reservationData.status === status ||
                        status === ""
                      }
                      className="px-2 py-1"
                    >
                      modifier
                    </Button>
                  </div>
                </div>
              )}

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
                  <Button
                    variant={"destructive"}
                    onClick={() => {
                      handleSubmitStatus(
                        "refuse",
                        reservationData.id,
                        reservationData.jobberId
                      );
                      setReservationData(null);
                    }}
                    className="py-1 px-3"
                  >
                    <X className="size-5" />
                  </Button>
                  <Button
                    className="py-1 px-3"
                    onClick={() => {
                      handleSubmitStatus(
                        "accepte",
                        reservationData.id,
                        reservationData.jobberId
                      );
                      setReservationData(null);
                    }}
                  >
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
  handleSubmitStatus,
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
        <div
          onClick={(e) => {
            reservation.status === "en attente" && e.stopPropagation();
          }}
          className="flex w-full items-end justify-between gap-2 box-border"
        >
          <span className="text-xs opacity-70">
            {new Date(reservation.reservationDate).toLocaleDateString("Fr-fr", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          {reservation.status === "en attente" && (
            <div
              className="flex flex-1 items-center justify-end gap-2 box-border transition-all 
            duration-300 ease-in-out"
            >
              <Button
                variant={"destructive"}
                className="py-1 px-3"
                onClick={() =>
                  handleSubmitStatus(
                    "refuse",
                    reservation.id,
                    reservation.jobberId
                  )
                }
              >
                <X className="size-5" />
              </Button>
              <Button
                className="py-1 px-3"
                onClick={() =>
                  handleSubmitStatus(
                    "accepte",
                    reservation.id,
                    reservation.jobberId
                  )
                }
              >
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
        <span className="text-xs opacity-80 font-medium text-gray-700 transition-all duration-300 ease-in-out">
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
    case "termine":
      return (
        <span className="text-xs opacity-80 font-medium text-green-700 transition-all duration-300 ease-in-out">
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
