import { User } from "next-auth";
import React from "react";
import ImagesProfilePreview from "./ImagesProfilePreview";
import InfosServices from "./InfosServices";
import InfosDescForm from "./InfosDescForm";
type Props = {
  service: User;
};

const ViewItem = ({ service }: Props) => {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-4 transition-all duration-300 ease-in-out">
      <div className="w-full h-60 lg:h-[280px] transition-all duration-300 ease-in-out box-border">
        <ImagesProfilePreview service={service} />
      </div>
      {/* desc and infos */}
      <section
        className="w-full grid  grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-4 p-2 items-start
        justify-start transition-all duration-300 ease-in-out box-border "
      >
        {/* names and location */}
        <InfosServices service={service} />
        {/* desc and form */}
        <InfosDescForm service={service} />
      </section>
    </div>
  );
};

export default ViewItem;
