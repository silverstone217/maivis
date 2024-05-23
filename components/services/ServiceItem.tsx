import { authOptions } from "@/lib/auth";
import { MapPin } from "lucide-react";
import { getServerSession, User } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  service: User;
};

const ServiceItem = async ({ service }: Props) => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!service.jobber) return null;

  const jobber = service.jobber;
  return (
    <Link
      href={user?.id === service.id ? "/dashboard" : `/services/${service.id}`}
      className="flex flex-col items-start justify-center px-2 lg:px-2 lg:py-4 py-2 box-border 
      gap-2 border-[1.5px] shadow-md rounded-md duration-300 transition-all ease-in-out"
    >
      <div className="flex items-start justify-start gap-2 box-border duration-300 transition-all ease-in-out">
        {/* images */}
        <div
          className="size-12 overflow-hidden flex items-center justify-center bg-secondary 
        rounded box-border duration-300 transition-all ease-in-out"
        >
          {jobber.images.length > 0 && (
            <Image
              src={
                service.image ? service.image : "https://github.com/shadcn.png"
              }
              alt="image service"
              priority
              width={2000}
              height={2000}
              className="size-full object-cover rounded duration-300 transition-all ease-in-out"
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

export default ServiceItem;
