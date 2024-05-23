"use client";
import {
  changeMomentSalary,
  changeOptionPaiment,
  changeTypeSalary,
} from "@/utils/fonctions";
import { Booking, Jobber, Rating, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export type ReservationType = Booking & {
  jobber: Jobber & {
    user: User;
  };
  ratings: Rating | null;
};

type Props = {
  reservation: ReservationType;
};

const ViewReservationComponent = ({ reservation }: Props) => {
  const { jobber } = reservation;
  const { user: jobUser } = jobber;
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();

  if (!user) {
    return null;
  }
  if (!reservation) {
    redirect("/reservations");
  }

  if (!jobber) {
    redirect("/reservations");
  }

  return (
    <div
      className="flex flex-col items-center justify-between p-3 lg:p-5 w-full
     duration-300 ease-in-out transition-all
    "
    >
      <div className="max-w-7xl mx-auto space-y-6 lg:space-y-10 w-full">
        {/* personnel infos */}
        <PersonnelSection jobUser={jobUser} jobber={jobber} />

        {/* payment and salary */}
        <SalaryPaymentSection jobUser={jobUser} jobber={jobber} />

        {/* form and desc */}

        <FormAdditionInfoSection
          jobUser={jobUser}
          jobber={jobber}
          reservation={reservation}
        />
        {/* rating */}
        <StatusSection reservation={reservation} />
      </div>
    </div>
  );
};

export default ViewReservationComponent;

const PersonnelSection = ({
  jobUser,
  jobber,
}: {
  jobUser: User;
  jobber: Jobber;
}) => {
  return (
    <section
      className="w-full px-2 py-4 box-border border flex flex-col items-start 
    justify-start gap-3 duration-300 ease-in-out transition-all"
    >
      <h2 className="font-bold line-clamp-1">Infos du personnel</h2>
      <div className="flex w-full items-start justify-start gap-4">
        {/* image */}
        <Image
          src={jobUser.image ? jobUser.image : "https://github.com/shadcn.png"}
          alt="personnel picture"
          width={2000}
          height={2000}
          priority
          className="size-10 object-cover rounded"
        />
        {/* infos */}
        <div className="w-full flex flex-col items-start justify-start box-border capitalize">
          <h2 className="font-semibold line-clamp-1 capitalize text-[18px]">
            {jobUser.name}
          </h2>
          <span
            className="text-xs line-clamp-1 bg-gradient-to-r from-green-700
           via-green-600 to-green-400 inline-block text-transparent bg-clip-text"
          >
            {jobber.job}
          </span>
          <span className="text-xs opacity-80 line-clamp-1">
            +243-{jobUser.tel}
          </span>
        </div>
      </div>
    </section>
  );
};

const SalaryPaymentSection = ({
  jobUser,
  jobber,
}: {
  jobUser: User;
  jobber: Jobber;
}) => {
  return (
    <section
      className="w-full px-2 py-4 box-border border flex flex-col items-start 
    justify-start gap-3 duration-300 ease-in-out transition-all"
    >
      <h2 className="font-bold line-clamp-1">Payment and salary</h2>
      <div className="flex flex-col w-full items-start justify-start gap-2">
        {/* salary */}
        <div className="flex w-full items-start justify-start gap-4">
          <span className="w-[150px] flex-shrink-0 line-clamp-1">
            Frais de service:
          </span>
          <span className="font-semibold line-clamp-">{jobber.salary}$</span>
        </div>
        {/* salary type */}
        <div className="flex w-full items-start justify-start gap-4">
          <span className="w-[150px] flex-shrink-0 line-clamp-1">
            Delais de paiment:
          </span>
          <span className="font-semibold line-clamp-1">
            {changeTypeSalary(jobber.typeSalary)}
          </span>
        </div>
        {/* transport fees */}
        <div className="flex w-full items-start justify-start gap-4">
          <span className="w-[150px] flex-shrink-0 line-clamp-1">
            Frais de transport:
          </span>
          <span className="font-semibold line-clamp-1">
            {jobber.transportFees && parseInt(jobber.transportFees)}$
          </span>
        </div>
        {/* payment options */}
        <div className="flex w-full items-start justify-start gap-4">
          <span className="w-[150px] flex-shrink-0 line-clamp-1">
            Moyen de paiment:
          </span>
          <span className="font-semibold line-clamp-1">
            {changeOptionPaiment(jobber.paimentOption)}
          </span>
        </div>

        {/* payment time */}
        <div className="flex w-full items-start justify-start gap-4">
          <span className="w-[150px] flex-shrink-0 line-clamp-1">
            Temps de paiment:
          </span>
          <span className="font-semibold line-clamp-1">
            {changeMomentSalary(jobber.paimentMoment)}
          </span>
        </div>
      </div>
    </section>
  );
};

const FormAdditionInfoSection = ({
  jobUser,
  jobber,
  reservation,
}: {
  jobUser: User;
  jobber: Jobber;
  reservation: ReservationType;
}) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();

  const [description, setDescription] = useState(reservation.description || "");
  const [address, setAddress] = useState(reservation.address || "");
  //   const [telephone, setTelephone] = useState(user?.tel || "");
  const [date, setDate] = useState(
    reservation && reservation.reservationDate
      ? new Date(reservation.reservationDate).toDateString()
      : ""
  );

  const [canModify, setCanModify] = useState(
    reservation.status === "accepte" || reservation.status === "en attente"
  );

  if (!user) {
    return null;
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const reserveTime =
        date.replace(/ /g, "") === ""
          ? reservation.reservationDate
          : new Date(date);

      const formData = {
        description,
        address,
        // telephone,
        userId: user.id,
        jobberId: jobber.id,
        bookingId: reservation.id,
        reservationDate: reserveTime,
      };

      const response = await fetch("/api/reservation/modify", {
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
          title: "erreur",
          duration: 2000,
        });
        setTimeout(() => setLoading(false), 1500);
        return;
      }
      toast({
        description: data.message,
        variant: "default",
        duration: 2000,
        title: "Success",
      });

      setTimeout(() => setLoading(false), 1500);
      setTimeout(() => router.refresh, 800);
    } catch (error) {
      const err = error as Error;
      toast({
        description: err.message,
        title: "erreur",
        duration: 2000,
        variant: "destructive",
      });
      setTimeout(() => setLoading(false), 1500);
    }
  };

  return (
    <section
      className="w-full px-2 py-4 box-border border flex flex-col 
    items-start justify-start gap-3 duration-300 ease-in-out transition-all"
    >
      <h2 className="font-bold line-clamp-1">Infos additionnelles</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          (reservation.status === "accepte" ||
            reservation.status === "en attente") &&
            handleSubmit();
        }}
        className="flex flex-col w-full items-start justify-start gap-4 box-border px-2"
      >
        {/* desc */}
        <div className="w-full flex flex-col gap-1.5 items-start justify-start">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
            minLength={10}
            maxLength={500}
            placeholder="Specifiez vos exigences, parler du probleme et d'autres de details..."
            required={true}
            disabled={loading}
            className="w-full max-h-44 min-h-28"
          />
        </div>
        {/* address */}
        <div className="w-full flex flex-col gap-1.5 items-start justify-start">
          <Label htmlFor="address">Adresse ou lieu de service</Label>
          <Input
            id="address"
            name="address"
            defaultValue={address}
            onChange={(e) => setAddress(e.target.value)}
            minLength={10}
            maxLength={500}
            placeholder="Votre adresse"
            required={true}
            disabled={loading}
          />
        </div>
        {/* Tel */}
        {/* <div className="w-full flex flex-col gap-1.5 items-start justify-start">
          <Label htmlFor="telephone">Telephone</Label>
          <Input
            id="telephone"
            name="telephone"
            type="tel"
            defaultValue={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            minLength={10}
            maxLength={500}
            placeholder="Votre telephone"
            required={true}
            disabled={loading}
          />
        </div> */}
        {/* Date */}
        <div className="w-full flex flex-col gap-1.5 items-start justify-start">
          <div className="w-full flex flex-wrap gap-x-3 items-center justify-start">
            <Label htmlFor="date">Date de reservation:</Label>
            <p className="text-sm font-semibold">
              {reservation.reservationDate
                ? new Date(reservation.reservationDate).toLocaleDateString(
                    "fr-FR",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    }
                  )
                : ""}
            </p>
            {canModify && (
              <span className="text-[11px] line-clamp-1">
                <strong> ps: </strong>

                {"uniquement la date et non l'heure ne peut etre changé."}
              </span>
            )}
          </div>
          <Input
            id="date"
            name="date"
            type="datetime-local"
            defaultValue={date}
            onChange={(e) => setDate(e.target.value)}
            minLength={10}
            maxLength={500}
            required={false}
            disabled={loading}
          />
        </div>
        {/* submit */}

        {canModify && (
          <Button
            type="submit"
            disabled={
              loading ||
              description.replace(/ /g, "") === "" ||
              address.replace(/ /g, "") === "" ||
              (description === reservation.description &&
                address === reservation.address &&
                new Date(date).toLocaleDateString() ===
                  new Date(reservation.reservationDate).toLocaleDateString())
            }
          >
            {loading ? "en cours..." : "Modifier"}
          </Button>
        )}
      </form>
    </section>
  );
};

const StatusSection = ({ reservation }: { reservation: ReservationType }) => {
  return (
    <section className="w-full px-2 py-4 box-border border flex flex-col items-start justify-start gap-3 duration-300 ease-in-out transition-all">
      <h2 className="font-bold line-clamp-1">
        Status et autres details de la reservations
      </h2>
      <div className="flex gap-1.5 items-center justify-start">
        <p className="w-16 flex-shrink-0">Status:</p>
        <p className="font-bold line-clamp-1">{reservation.status}</p>
      </div>
      <div className="flex  gap-1.5 items-center justify-start">
        <p className="w-16 flex-shrink-0">Note:</p>
        <p className="font-bold line-clamp-1">
          {reservation.ratings?.rate || 3}
        </p>
      </div>
    </section>
  );
};
