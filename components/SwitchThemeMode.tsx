"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";

const SwitchThemeMode = () => {
  const { setTheme, theme } = useTheme();

  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Link
      href={"#"}
      onClick={() => (theme === "light" ? setTheme("dark") : setTheme("light"))}
      className="flex items-center justify-start gap-6 px-2 py-1 rounded-md transition-all duration-300 ease-in-out"
    >
      {theme === "light" ? (
        <Sun className="size-5 flex-shrink-0 transition-all duration-300 ease-in-out" />
      ) : (
        <Moon className="size-5 flex-shrink-0 transition-all duration-300 ease-in-out" />
      )}
      <span className="text-[16px] lg:hidden font-medium capitalize transition-all duration-300 ease-in-out">
        {" "}
        {theme === "light" ? "Light" : "Dark"}{" "}
      </span>
    </Link>
  );
};

export default SwitchThemeMode;
