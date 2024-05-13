"use client";
import React, { useEffect, useState } from "react";
import hero1 from "../../public/images/hero1.avif";
import hero2 from "../../public/images/hero1.jpeg";
import hero3 from "../../public/images/hero2.jpeg";
import Image from "next/image";

const imageSlider = [hero1, hero2, hero3];

const CarouselImageSection = () => {
  const [index, setIndex] = useState(0);

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
    <div className="w-full h-full overflow-hidden relative flex flex-row items-start justify-start">
      <Image
        src={imageSlider[index]}
        alt="services images"
        width={1200}
        height={1200}
        priority
        className="w-full h-full object-cover flex-shrink-0 animate-fade-in brightness-95"
      />
      <div className="absolute z-10 left-2/4 translate-x-[-50%] flex bottom-4 gap-4">
        {imageSlider.map((_, i) => (
          <div
            key={i}
            className={
              index === i
                ? "px-6 py-2 rounded-md bg-primary animate-fade-in transition-all ease-in-out duration-300"
                : "px-4 py-2 rounded-md bg-secondary animate-fade-in transition-all ease-in-out duration-300"
            }
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselImageSection;
