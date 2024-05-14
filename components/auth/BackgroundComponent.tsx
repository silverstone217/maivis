"use client";
import React, { Suspense, useEffect, useState } from "react";
import bg1 from "../../public/images/bg1.jpeg";
import bg2 from "../../public/images/bg2.jpeg";
import bg3 from "../../public/images/bg3.jpeg";
import bg4 from "../../public/images/bg4.jpeg";
import Image from "next/image";
import { usePathname } from "next/navigation";

const imageSlider = [bg1, bg2, bg3, bg4];

const BackgroundComponent = () => {
  const [index, setIndex] = useState(0);

  const path = usePathname();

  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index) => (index === imageSlider.length - 1 ? 0 : index + 1));
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [index]);

  if (!isMounted) return null;

  return (
    <div
      className="w-full h-full overflow-hidden relative flex flex-row items-start justify-start
     transition-all duration-300 ease-in-out"
    >
      <Suspense>
        <Image
          src={imageSlider[index]}
          alt="services images"
          width={4000}
          height={4000}
          priority
          className="w-full h-full object-cover flex-shrink-0 animate-fade-in brightness-75"
        />
      </Suspense>
      {path === "sign-in" ? (
        <div className="absolute z-10 top-2/4 translate-y-[-50%] hidden lg:flex left-2 gap-4 items-start">
          {imageSlider.map((_, i) => (
            <div
              key={i}
              className={
                index === i
                  ? "py-3 px-2 rounded-md bg-primary animate-fade-in transition-all ease-in-out duration-300"
                  : "py-2 px-2 rounded-md bg-secondary animate-fade-in transition-all ease-in-out duration-300"
              }
            />
          ))}
        </div>
      ) : (
        <div className="absolute z-10 left-2/4 translate-x-[-50%] hidden lg:flex bottom-10 gap-4 items-start">
          {imageSlider.map((_, i) => (
            <div
              key={i}
              className={
                index === i
                  ? "py-2 px-4 rounded-md bg-primary animate-fade-in transition-all ease-in-out duration-300"
                  : "py-2 px-2 rounded-md bg-secondary animate-fade-in transition-all ease-in-out duration-300"
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BackgroundComponent;
