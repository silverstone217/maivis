import React from "react";
import cleaning from "../../public/icons/cleaning.png";
import painter from "../../public/icons/painter.png";
import plumber from "../../public/icons/plumber.png";
import nanny from "../../public/icons/nanny.svg";
import sentinel from "../../public/icons/sentinel.png";
import wood from "../../public/icons/wood.png";
import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    id: 1,
    title: "Femme de menage",
    icon: cleaning,
    path: "femme de menage",
  },
  {
    id: 2,
    title: "Plombier",
    icon: plumber,
    path: "plombier",
  },
  {
    id: 3,
    title: "Nourrice",
    icon: nanny,
    path: "nourrice",
  },
  {
    id: 4,
    title: "Sentinelle",
    icon: sentinel,
    path: "sentinelle",
  },
  {
    id: 5,
    title: "Menusier",
    icon: wood,
    path: "menusier",
  },
  {
    id: 6,
    title: "Peintre",
    icon: painter,
    path: "peintre",
  },
];

const CategorySections = () => {
  return (
    <div className="grid grid-cols-3 w-11/12 md:w-4/5 md:grid-cols-6 mx-auto gap-6 md:gap-10">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={{
            pathname: "/services/",
            query: {
              job: cat.path,
            },
          }}
          className="flex flex-col items-center justify-center w-full text-balance gap-1 p-1
          md:px-3 group overflow-hidden dark:bg-primary text-black
          hover:cursor-pointer transition-all ease-in-out duration-300
          "
        >
          <Image
            src={cat.icon}
            alt={cat.title}
            priority
            width={250}
            height={250}
            color="green"
            className="object-cover w-full h-auto group-hover:scale-105
             transition-all ease-in-out duration-300"
          />
          <span
            className="text-balance text-sm group-hover:scale-105
           transition-all ease-in-out duration-300"
          >
            {cat.title}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default CategorySections;
