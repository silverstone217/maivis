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
import { changeMomentSalary, changeOptionPaiment } from "@/utils/fonctions";

type Props = {
  service: User;
};

const InfosDescForm = ({ service }: Props) => {
  const jobber = service.jobber;

  if (!jobber) return;

  return (
    <div
      className="flex w-full flex-col gap-8 lg:gap-10 items-start justify-start 
    transition-all duration-300 ease-in-out box-border"
    >
      {/* desc and options */}
      <div className="grid w-full grid-cols-1 gap-6 text-sm">
        {/* description */}
        <p className="tex">{jobber.description}</p>

        {/* options */}
        <div className="w-full flex flex-col  gap-2 text-sm">
          {/* <p>Options de paiment</p> */}
          <div className="grid w-full grid-cols-2 gap-4 text-sm text-center capitalize">
            <div className="flex gap-1 items-center justify-center">
              <HandCoins className="size-5 flex-shrink-0" />
              <span className="line-clamp-1">
                {changeOptionPaiment(jobber.paimentOption)}
              </span>
            </div>

            <div className="flex gap-1 items-center justify-center">
              <BriefcaseBusiness className="size-5 flex-shrink-0" />
              <span className="line-clamp-1">
                {changeMomentSalary(jobber.paimentMoment)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* call and apply */}
      <section className="grid grid-cols-2 gap-4 w-full transition-all duration-300 ease-in-out box-border">
        <Button
          variant={"outline"}
          className="box-border px-4 py-3 rounded shadow-sm border-[0.5px] flex gap-1
         items-center justify-center"
        >
          <Phone className="size-5 flex-shrink-0" />
          <div className="flex flex-wrap box-border gap-1 ">
            <span className="font-semibold capitalize line-clamp-1 text-center">
              Appeler
            </span>
            {/* <span>/</span> */}
            <span className="text-sm opacity-85"></span>
          </div>
        </Button>
        <Button
          className="box-border px-4 py-3 rounded shadow-sm border-[0.5px] flex gap-1
         items-center justify-center"
        >
          <UserPlus className="size-5" />
          <div className="flex flex-wrap box-border gap-1 ">
            <span className="font-semibold capitalize line-clamp-1 text-center">
              Engager
            </span>
            {/* <span>/</span> */}
            <span className="text-sm opacity-85"></span>
          </div>
        </Button>
      </section>
    </div>
  );
};

export default InfosDescForm;
