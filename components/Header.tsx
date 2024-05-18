"use client";
import { Links } from "@/lib/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import LoginSugBtn from "./forms/LoginSugBtn";
import NavigationSheet from "./NavigationSheet";
import SwitchThemeMode from "./SwitchThemeMode";
import LogoComponent from "./LogoComponent";
import { useSession } from "next-auth/react";
import HeaderUserInfo from "./HeaderUserInfo";

const Header = () => {
  const pathName = usePathname();

  const { data: session, status } = useSession();
  const user = session?.user;

  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    // Get the element when the component has mounted
    const scrollDiv = document.querySelector(".scroll-div");

    // Continue the rest of the function only if the element exists
    if (scrollDiv) {
      const handleScroll = () => {
        if (scrollDiv.scrollTop > 18) {
          setScrolling(true);
        } else {
          setScrolling(false);
        }
      };

      scrollDiv.addEventListener("scroll", handleScroll);

      return () => {
        scrollDiv.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  if (pathName.includes("sign")) return null;

  return (
    <div
      className={`w-full py-4 shadow-md fixed z-50 ${
        scrolling ? "bg-secondary" : "bg-transparent"
      } transition-all duration-300 ease-in-out`}
    >
      <div
        className="w-full max-w-7xl mx-auto px-4 2xl:px-0 flex items-center justify-between 
      transition-all duration-300 ease-in-out"
      >
        {/* logo and pages */}
        <div className="flex items-center gap-16">
          {/* logo */}
          <LogoComponent />
          {/* pages */}
          <PageLinks />
        </div>
        {/* auth buttons */}
        <div className="hidden lg:flex items-center gap-2">
          <SwitchThemeMode />
          {user ? <HeaderUserInfo /> : <LoginSugBtn />}
        </div>
        <div className="lg:hidden">
          <NavigationSheet />
        </div>
      </div>
    </div>
  );
};

const PageLinks = () => {
  return (
    <div className="hidden lg:flex flex-row items-center justify-start gap-2 text-[16px]">
      {Links.map((link, i) => (
        <Link
          key={i}
          href={link.path}
          className="text-[16px] tracking-wide flex items-center justify-center 
              hover:cursor-pointer hover:bg-primary p-1 px-2 rounded transition-all duration-300 ease-in-out
              "
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};

export default Header;
