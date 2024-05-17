import ServicesComponent from "@/components/services/ServicesComponent";
import React from "react";
import { getServices } from "../page";
import { User } from "next-auth";

const Services = async () => {
  const services = (await getServices()) as unknown as User[];

  return (
    <div>
      <ServicesComponent services={services} />
    </div>
  );
};

export default Services;
