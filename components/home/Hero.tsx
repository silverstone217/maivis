import React, { Suspense, useState } from "react";
import { Button } from "../ui/button";
import CarouselImageSection from "./CarouselImageSection";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-2 md:gap-4 md:h-[500px] mx-auto">
      {/* text and desc */}
      <section className="w-full flex flex-col h-96 md:h-full items-start justify-evenly py-2 ">
        {/* title */}
        <div className="space-y-2">
          <h2 className=" text-[20px] lg:text-3xl font-black tracking-wide md:text-balance animate-fade-in">
            Rechercher ce dont vous avez besion
          </h2>
          <h2 className="text-[20px] lg:text-2xl font-bold tracking-wide opacity-80 md:text-balance animate-fade-in">
            Des professionels ou services de maison
          </h2>
          <h2 className="text-[20px] lg:text-2xl text-primary font-extrabold tracking-wide md:text-balance animate-fade-in">
            Facilement sur MAIVIS.
          </h2>
        </div>
        {/* desc */}
        <div className="text-xs lg:text-sm opacity-80 animate-fade-in">
          <p>
            Des centaines de personne ont deja choisi{" "}
            <strong className="text-primary">Maivis</strong> pour leur service
            de maisons.
          </p>
          <p>
            <strong className="text-primary">Maivis</strong> gere des femmes de
            menages, des plombiers, nourices, sentinelles et plus encores.
          </p>
        </div>
        {/* btn get started */}

        <div className="w-full flex items-center justify-center gap-4 flex-wrap animate-slide-down">
          <Button className="flex-1" asChild>
            <Link href={"/services"}> Reserver maintenant</Link>
          </Button>
          <Button className="flex-1" variant={"outline"} asChild>
            <Link href={"/dashboard"}> Devenir Membre</Link>
          </Button>
        </div>
      </section>

      {/*images carousel */}
      <section className="w-full flex h-96 md:h-full bg-secondary">
        <Suspense>
          <CarouselImageSection />
        </Suspense>
      </section>
    </div>
  );
};

export default Hero;
