import ServicesComponent from "@/components/services/ServicesComponent";
import React from "react";
import { getServices } from "../page";
import { User } from "next-auth";

const Services = async () => {
  const services = (await getServices()) as unknown as User[];

  return (
    <div className="min-h-[90vh]">
      <div className="mt-16" />
      <ServicesComponent services={services} />
    </div>
  );
};

export default Services;
