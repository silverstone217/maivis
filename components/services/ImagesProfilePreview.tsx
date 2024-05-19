"use client";
import { User } from "next-auth";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import { UserPicture } from "../HeaderUserInfo";
import Image from "next/image";

type Props = {
  service: User;
};

const ImagesProfilePreview = ({ service }: Props) => {
  const [index, setIndex] = useState(0);
  const jobber = service.jobber;
  const images = useMemo(() => jobber?.images, [jobber?.images]);

  useEffect(() => {
    if (!images) return;
    const interval = setInterval(() => {
      setIndex((index) => (index === images.length - 1 ? 0 : index + 1));
    }, 8000);

    return () => {
      clearInterval(interval);
    };
  }, [index, images]);

  if (!jobber || !images) return null;

  return (
    <section className="flex flex-col w-full items-start justify-start box-border relative">
      {/* images slider */}

      <div className="w-full flex items-center justify-center absolute left-0 top-0">
        <Suspense>
          <div key={index} className="w-full h-full relative">
            <Image
              src={images[index]}
              alt="services images"
              width={2200}
              height={2200}
              priority
              className="w-full h-60 lg:h-[270px] object-cover flex-shrink-0 animate-fade-in brightness-95"
            />
            {/* image controller */}
            <div className="absolute z-10 left-2/4 translate-x-[-50%] flex bottom-4 gap-3">
              {images.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setIndex(i)}
                  className={
                    index === i
                      ? "px-4 py-2 rounded-md bg-primary animate-fade-in transition-all ease-in-out duration-300"
                      : "px-2 py-2 rounded-md bg-secondary animate-fade-in transition-all ease-in-out duration-300"
                  }
                />
              ))}
            </div>
          </div>
        </Suspense>
      </div>

      {/* profile picture */}
      <div className="p-2 z-10">
        <UserPicture user={service} />
      </div>
    </section>
  );
};

export default ImagesProfilePreview;
