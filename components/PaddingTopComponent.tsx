"use client";
import { usePathname } from "next/navigation";
import React from "react";

const PaddingTopComponent = () => {
  const pathName = usePathname();

  if (pathName.includes("sign")) return null;
  return <div className="mt-16"></div>;
};

export default PaddingTopComponent;
