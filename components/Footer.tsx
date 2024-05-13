"use client";
import { usePathname } from "next/navigation";
import React from "react";

const Footer = () => {
  const pathName = usePathname();
  if (pathName.includes("sign")) return null;
  return <div>Footer</div>;
};

export default Footer;
