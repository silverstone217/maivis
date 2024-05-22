"use client";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { changeName } from "@/utils/fonctions";
import { User } from "next-auth";
import { useToast } from "./ui/use-toast";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { paths } from "./NavigationSheet";

const HeaderUserInfo = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const { toast } = useToast();

  const [isRedirected, setIsRedirected] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    if (paths.includes(pathName) && pathName !== "/") {
      setIsRedirected(true);
    } else {
      setIsRedirected(false);
    }
  }, [isRedirected, pathName]);

  if (!user) return null;

  const handleLogout = async () => {
    try {
      await signOut({
        redirect: isRedirected,
        callbackUrl: isRedirected ? "/sign-in" : "/",
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
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserPicture user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={"/dashboard"} className="cursor-pointer ">
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={"/profile"} className="cursor-pointer ">
            Profile
          </Link>
        </DropdownMenuItem>
        {user && (
          <DropdownMenuItem asChild>
            <Link href={"/reservations"} className="cursor-pointer ">
              Reservations
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild disabled>
          <Link href={"/notifications"} className="cursor-pointer ">
            Notifications
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <span
            onClick={handleLogout}
            className="text-destructive cursor-pointer "
          >
            Deconnexion
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

type Props = {
  user: User;
};

export const UserPicture = ({ user }: Props) => {
  return (
    <Avatar>
      <AvatarImage
        src={user.image ? user.image : "https://github.com/shadcn.png"}
      />
      <AvatarFallback>{changeName(user?.name)}</AvatarFallback>
    </Avatar>
  );
};

export default HeaderUserInfo;
