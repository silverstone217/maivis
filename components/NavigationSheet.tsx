import React from "react";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";
import { Links } from "@/lib/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LoginSugBtn from "./forms/LoginSugBtn";
import SwitchThemeMode from "./SwitchThemeMode";

const NavigationSheet = () => {
  const pathName = usePathname();
  return (
    <Sheet>
      <SheetTrigger>
        <AlignJustify />
      </SheetTrigger>
      <SheetContent>
        <div className="w-full">
          {/* Links */}
          <div className="w-full flex flex-col items-start justify-start gap-2 mt-10">
            {Links.map((link, index) => (
              <SheetClose asChild key={index}>
                <Link
                  href={link.path}
                  className={`text-[18px] font-medium tracking-wider capitalize w-full  py-1 px-2
                    ${
                      pathName.toLowerCase() === link.path.toLowerCase()
                        ? "text-primary"
                        : ""
                    }
                    transition-all duration-300 ease-in-out
                  `}
                >
                  {link.name}
                </Link>
              </SheetClose>
            ))}
          </div>

          <div className="my-16" />

          <SwitchThemeMode />
          {/* Btn auth */}
          <div className="my-3" />
          <LoginSugBtn />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavigationSheet;
