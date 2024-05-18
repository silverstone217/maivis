"use client";
import { User } from "next-auth";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useMemo, useState } from "react";
import SearchComponent from "./SearchComponent";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

type Props = {
  services: User[];
};

const ServicesComponent = ({ services }: Props) => {
  const searchParams = useSearchParams();

  const searchJob = searchParams.get("job");
  const [job, setJob] = useState(searchJob || "");
  const [searchText, setSearhcText] = useState("");

  const filteredData = useMemo(
    () =>
      services
        .filter(
          (item) =>
            item.jobber?.job.includes(searchText.toLowerCase()) ||
            item.name?.toLocaleLowerCase().includes(searchText.toLowerCase())
        )
        .filter((item) => item.jobber?.job.includes(job.toLowerCase())),
    [services, job, searchText]
  );

  return (
    <div className="flex flex-col items-center justify-between p-3 lg:p-5 w-full">
      <div className="max-w-7xl mx-auto space-y-10 lg:space-y-16 w-full">
        {/* search header */}
        <SearchComponent
          job={job}
          searchText={searchText}
          setJob={setJob}
          setSearchText={setSearhcText}
        />

        {/* services */}
        <div>
          <section className="text-xl font-bold w-full flex items-center  gap-1 py-2 border-b-[0.5px] transition-all duration-300 ease-in-out">
            <h2>Tous les services</h2>
            <span>({services.length})</span>
          </section>

          <div className="my-4" />

          <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 box-border transition-all duration-300 ease-in-out">
            {filteredData.length > 0 &&
              filteredData.map((service) => (
                <Suspense key={service.id}>
                  <ServiceItem service={service} key={service.id} />
                </Suspense>
              ))}
          </section>
        </div>
      </div>
    </div>
  );
};

type PropsService = {
  service: User;
};

const ServiceItem = ({ service }: PropsService) => {
  const { data: session } = useSession();
  const user = session?.user;

  if (!service.jobber) return null;

  const jobber = service.jobber;
  return (
    <Link
      href={user?.id === service.id ? "/dashboard" : `/services/${service.id}`}
      className="flex flex-col items-start justify-center px-2 lg:px-2 lg:py-4 py-2 
      box-border gap-2 border shadow-md rounded-md 
      transition-all duration-300 ease-in-out
      "
    >
      <div className="flex items-start justify-start gap-2 box-border">
        {/* images */}
        <div
          className="size-12 overflow-hidden flex items-center justify-center bg-secondary 
          rounded box-border"
        >
          {jobber.images.length > 0 && (
            <Image
              src={jobber.images[0]}
              alt="image service"
              priority
              width={2000}
              height={2000}
              className="size-full object-cover rounded"
            />
          )}
        </div>

        {/* name address and tel */}
        <div className="flex-1 flex flex-col items-start justify-start gap-1">
          <h2 className="font-medium line-clamp-1 capitalize">
            {service.name}
          </h2>
          <div className="w-full flex flex-col items-start gap-1 overflow-hidden box-border">
            <span className="text-xs text-gray-500 line-clamp-1">
              {jobber.address}
            </span>
          </div>
        </div>
      </div>
      {/* separator */}
      <div className="w-full border-b-[0.5px]" />
      {/* paiment and category */}
      <div className="flex items-center justify-start gap-4 box-border w-full">
        <span
          className="px-2 py-1 text-white text-xs font-medium 
          capitalize from-40% bg-gradient-to-r from-red-500 to-red-400 rounded-md flex-1 max-w-fit"
        >
          {jobber.job}
        </span>
        <span
          className="px-2 py-1 text-white text-xs font-medium 
          capitalize rounded-md from-green-600 bg-gradient-to-r to-green-400 flex-1  max-w-fit"
        >
          {jobber.salary}$
        </span>
      </div>
    </Link>
  );
};

export default ServicesComponent;
