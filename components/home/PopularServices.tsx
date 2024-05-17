import { User } from "next-auth";
import React, { Suspense } from "react";
import ServiceItem from "../services/ServiceItem";
import Link from "next/link";

type Props = {
  services: User[];
};

const PopularServices = ({ services }: Props) => {
  return (
    <main className=" border-[0.5px] rounded px-2 lg:px-2 lg:py-4 py-2 box-border transition-all duration-300 ease-in-out">
      <div className="w-full relative transition-all duration-300 ease-in-out">
        <div className="w-full flex items-center justify-end my-3 md:my-2">
          <Link
            href={"/services"}
            className="text-primary text-sm font-medium shadow
            rounded-2xl px-3 py-1 border border-secondary transition-all duration-300 ease-in-out"
          >
            Voir tout
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-center">
          Les personnels populaires
        </h2>
        <div className="my-6 lg:my-4" />

        <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 box-border transition-all duration-300 ease-in-out">
          {services.length > 0 &&
            services.map((service) => (
              <Suspense key={service.id}>
                <ServiceItem service={service} key={service.id} />
              </Suspense>
            ))}
        </section>
      </div>
    </main>
  );
};

export default PopularServices;
