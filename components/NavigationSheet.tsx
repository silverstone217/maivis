import React, { useEffect, useState } from "react";
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
import { UserPicture } from "./HeaderUserInfo";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

const NavigationSheet = () => {
  const pathName = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <Sheet>
      <SheetTrigger>
        <AlignJustify />
      </SheetTrigger>
      <SheetContent>
        <div className="w-full">
          {/* profile */}
          {user && (
            <SheetClose asChild>
              <Link href={"/profile"}>
                <UserPicture user={user} />
                <div className=" flex flex-col items-start justify-start">
                  <span className="text-sm font-bold line-clamp-1 capitalize">
                    {user?.name}
                  </span>
                  <span className="text-xs font-normal opacity-80 line-clamp-1">
                    {user?.email}
                  </span>
                </div>
              </Link>
            </SheetClose>
          )}
          {/* divider */}
          <div
            className={`bg-gray-700 w-full ${
              user ? "border-b-[0.5px]" : ""
            } my-4 transition-all duration-300 ease-in-out`}
          />
          {/* Links */}
          <div className="w-full flex flex-col items-start justify-start gap-2 transition-all duration-300 ease-in-out">
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
            {user && (
              <SheetClose asChild>
                <Link
                  href={"/dashboard"}
                  className={`text-[18px] font-medium tracking-wider capitalize w-full  py-1 px-2
                    ${
                      pathName.toLowerCase() === "/dashboard".toLowerCase()
                        ? "text-primary"
                        : ""
                    }
                    transition-all duration-300 ease-in-out
                  `}
                >
                  Dashboard
                </Link>
              </SheetClose>
            )}
          </div>

          <div className="my-16" />

          <SwitchThemeMode />
          {/* Btn auth */}
          <div className="my-3" />
          {user ? <LogOutSugBtn /> : <LoginSugBtn />}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export const paths = ["/dashboard", "/profile"];

const LogOutSugBtn = () => {
  const { toast } = useToast();
  const pathName = usePathname();

  const [isRedirected, setIsRedirected] = useState(false);

  useEffect(() => {
    if (paths.includes(pathName) && pathName !== "/") {
      setIsRedirected(true);
    } else {
      setIsRedirected(false);
    }
  }, [isRedirected, pathName]);

  const handleLogout = async () => {
    try {
      await signOut({
        redirect: isRedirected,
        callbackUrl: "/",
      });
      toast({
        title: "Déconnexion",
        description: "Vous êtes maintenant déconnecté",
        duration: 2000,
      });
    } catch (error) {
      const err = error as Error;
      toast({
        title: "Oh! Une erreur s'est produite!",
        description: err.message,
        variant: "destructive",
        duration: 2000,
      });
    }
  };
  return (
    <Button
      variant={"destructive"}
      onClick={handleLogout}
      className="transition-all duration-300 ease-in-out"
    >
      Deconnexion
    </Button>
  );
};

export default NavigationSheet;
