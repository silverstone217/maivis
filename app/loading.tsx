import LogoComponent from "@/components/LogoComponent";
import React from "react";

const loading = () => {
  return (
    <main className="min-h-[85vh] 2xl:max-w-7xl mx-auto w-full">
      <div className="mt-16" />
      <div className="flex min-h-96 flex-col p-10 lg:p-20 items-center w-full justify-center gap-y-6">
        <LogoComponent />
        <p className="text-xl">
          Chez <strong className="text-primary">Maivis</strong> Trouves
          facilement, ce dont tu cherches.
        </p>
      </div>
    </main>
  );
};

export default loading;
