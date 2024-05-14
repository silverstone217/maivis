import React from "react";
import logo from "../public/images/logo3.png";
import Image from "next/image";
import Link from "next/link";

const LogoComponent = () => {
  return (
    <Link
      href={"/"}
      className="text-[20px] tracking-wide flex items-center z-20"
    >
      <Image
        src={logo}
        alt="logo Maivis"
        priority
        width={500}
        height={500}
        className="w-auto h-10"
      />
      {/* <span className="font-extrabold px-1 pt-1 bg-primary rounded-t-xl text-white">
      M
    </span> */}
      <span className="mt-1 ml-[0.5px] text-[18px] font-semibold">aivis</span>
    </Link>
  );
};

export default LogoComponent;
