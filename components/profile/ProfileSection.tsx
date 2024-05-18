"use client";
import React, { ReactNode } from "react";

const ProfileSection = ({ children }: { children: ReactNode }) => {
  return (
    <section className="w-full border-[0.5px] p-2 min-h-12 box-border">
      <div className="w-full flex items-center justify-start gap-4 flex-wrap box-border">
        {children}
      </div>
    </section>
  );
};

export default ProfileSection;
