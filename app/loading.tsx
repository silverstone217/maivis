import LogoComponent from "@/components/LogoComponent";
import React from "react";

const loading = () => {
  return (
    <main className="flex min-h-dvh 2xl:max-w-7xl mx-auto w-full">
      <div className="flex flex-col p-24 items-start flex-wrap w-full justify-center gap-y-6">
        <LogoComponent />
        <p className="">
          Chez <strong className="text-primary">Maivis</strong> Trouves
          facilement, ce dont tu cherches.
        </p>
      </div>
    </main>
  );
};

export default loading;
