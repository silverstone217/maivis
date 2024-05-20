import { User } from "@/types/auth";
import React from "react";
import { UserPicture } from "../HeaderUserInfo";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Button } from "../ui/button";
import {
  EmailComponent,
  NameComponent,
  PasswordComponent,
} from "./ProfileInputWrapper";
import ChangeProfilePicture from "./ChangeProfilePicture";

type Props = {
  myProfile: User;
};
const ProfileComponent = async ({ myProfile }: Props) => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user || !myProfile) {
    return null;
  }

  //   console.log("image", user);

  return (
    <div
      className="w-full min-h-[90vh] max-w-7xl flex flex-col items-center justify-start 
    mx-auto p-2 gap-6 box-border transition-all duration-300 ease-in-out
    "
    >
      <section>
        <h1 className="text-xl font-bold tracking-wide">Mon profile</h1>
      </section>

      {/* profile picture */}
      <section className="w-full border-[0.5px] p-2 min-h-12 box-border">
        <div className="w-full flex items-center justify-start gap-4 flex-wrap box-border">
          <UserPicture user={user} />
          <ChangeProfilePicture />
        </div>
      </section>

      {/* name */}
      <NameComponent myProfile={myProfile} />

      {/* email */}
      <EmailComponent myProfile={myProfile} />

      {/* password */}
      <PasswordComponent myProfile={myProfile} />

      {/* infos sections */}
    </div>
  );
};

export default ProfileComponent;
