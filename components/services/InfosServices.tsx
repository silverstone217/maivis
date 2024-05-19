import {
  BriefcaseBusiness,
  Bus,
  CircleDollarSign,
  HandCoins,
  Phone,
  UserPlus,
} from "lucide-react";
import { User } from "next-auth";
import React from "react";
import { Button } from "../ui/button";
import { changeTypeSalary } from "@/utils/fonctions";

type Props = {
  service: User;
};

const InfosServices = ({ service }: Props) => {
  const jobber = service.jobber;

  if (!jobber) return;

  return (
    <div
      className="flex w-full flex-col gap-8 lg:gap-9 items-start justify-start
     transition-all duration-300 ease-in-out box-border"
    >
      {/* name and address */}
      <div className="grid w-full grid-cols-2 gap-2">
        <div className="text-sm  flex flex-col items-start justify-start">
          <span className="opacity-85">Nom et prenom</span>
          <span className="font-semibold capitalize line-clamp-1">
            {service.name}
          </span>
        </div>
        <div className="text-sm  flex flex-col items-start justify-start">
          <span className="opacity-85">Adresse</span>
          <span className="font-semibold capitalize line-clamp-1">
            {jobber.address}
          </span>
        </div>
      </div>

      {/* job and tel */}
      <div className="grid w-full grid-cols-2 gap-2">
        <div className="text-sm  flex flex-col items-start justify-start">
          <span className="opacity-85">Poste</span>
          <span
            className="font-semibold capitalize line-clamp-1 
          bg-gradient-to-r from-green-600 via-green-500 to-green-400
          inline-block text-transparent bg-clip-text"
          >
            {jobber.job}
          </span>
        </div>
        <div className="text-sm flex flex-col items-start justify-start">
          <span className="opacity-85">Telephone</span>
          <span className="font-semibold capitalize line-clamp-1">
            {service.tel}
          </span>
        </div>
      </div>

      {/* salaire and transport fees */}
      <div className="grid w-full grid-cols-2 gap-4 text-sm text-center">
        <div className="box-border p-2 py-3 rounded shadow-sm border-[0.5px] flex gap-1 items-center justify-center">
          <CircleDollarSign className="size-5 flex-shrink-0" />
          <div className="flex flex-wrap box-border gap-1">
            <span className="font-semibold capitalize line-clamp-1 text-center">
              {jobber.salary}$
            </span>
            <span> / </span>
            <span className="text-sm opacity-85">
              {changeTypeSalary(jobber.typeSalary)}
            </span>
          </div>
        </div>

        <div
          className="box-border px-4 py-3 rounded shadow-sm border-[0.5px] flex gap-1
         items-center justify-center"
        >
          <Bus className="size-5 flex-shrink-0" />
          <div className="flex flex-wrap box-border gap-1 ">
            <span className="font-semibold capitalize line-clamp-1 text-center">
              {jobber.transportFees}$
            </span>
            {/* <span>/</span> */}
            <span className="text-sm opacity-85"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfosServices;
