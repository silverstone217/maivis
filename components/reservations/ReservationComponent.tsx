"use client";
import { Booking, Jobber, Rating, User } from "@prisma/client";
import React, { Suspense, useMemo, useState } from "react";
import SearchComponent from "./SearchComponent";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import Link from "next/link";
import ReservationsList from "./ReservationsList";

export type ReservationsType = Booking & {
  ratings: Rating | null;
  jobber: Jobber & {
    user: User;
  };
};

type Props = {
  reservations: ReservationsType[];
};

const ReservationComponent = ({ reservations }: Props) => {
  const [status, setStatus] = useState("");
  const [searchText, setSearchText] = useState("");
  const [job, setJob] = useState("");

  const { data: session } = useSession();
  const user = session?.user;

  const [loading, setLoading] = useState(false);

  const filteredData = useMemo(
    () =>
      reservations
        .filter((item) => item.status.includes(status))
        .filter(
          (item) =>
            item.address.includes(searchText.toLowerCase()) ||
            item.jobber.address.includes(searchText.toLowerCase()) ||
            (item.jobber.description &&
              item.jobber.description.includes(searchText.toLowerCase())) ||
            item.jobber.salary.includes(searchText.toLowerCase()) ||
            (item.jobber.user.name &&
              item.jobber.user.name
                .toLowerCase()
                .includes(searchText.toLowerCase()))
        )
        .filter((item) => item.jobber.job.includes(job.toLowerCase())),
    [reservations, status, searchText, job]
  );

  if (!user) return null;

  if (loading) {
    return (
      <div className="p-2 pt-6 text-center font-semibold transition-all duration-300 ease-in-out">
        chargement...
      </div>
    );
  }

  if ((!filteredData || !reservations) && !loading) {
    return (
      <div className="w-full py-3">
        <div className="h-4"></div>
        <div
          className="max-w-7xl mx-auto space-y-4 w-11/12 xl:w-full text-center py-8 border 
        shadow transition-all duration-300 ease-in-out
        "
        >
          <h2 className="font-bold opacity-80">Aucune reservation trouvée</h2>
          <Button asChild>
            <Link href="/services" className="">
              Allez reserver maintenant
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-between p-3 lg:p-5 w-full">
      <div className="max-w-7xl mx-auto space-y-6 lg:space-y-10 w-full">
        {/* header search */}
        <SearchComponent
          job={job}
          searchText={searchText}
          status={status}
          setJob={setJob}
          setSearchText={setSearchText}
          setStatus={setStatus}
          loading={loading}
          setLoading={setLoading}
        />

        {/* reservations lists */}
        <div>
          <section className="text-xl font-bold w-full flex items-center  gap-1 py-2 border-b-[0.5px] transition-all duration-300 ease-in-out">
            <h2>Toutes les reservations</h2>
            <span>
              ({filteredData.filter((x) => x.jobber !== null).length})
            </span>
          </section>

          <div className="my-4" />

          <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 box-border transition-all duration-300 ease-in-out">
            {filteredData.length > 0 &&
              filteredData.map((item) => (
                <Suspense key={item.id}>
                  <ReservationsList reservation={item} key={item.id} />
                </Suspense>
              ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ReservationComponent;
