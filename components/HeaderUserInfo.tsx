import React from "react";
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

const HeaderUserInfo = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const { toast } = useToast();

  if (!user) return null;

  const handleLogout = async () => {
    try {
      await signOut({
        redirect: false,
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
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserPicture user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Dashboard</DropdownMenuItem>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Notifications</DropdownMenuItem>
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
