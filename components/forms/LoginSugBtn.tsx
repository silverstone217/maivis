import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const LoginSugBtn = () => {
  return (
    <Button asChild>
      <Link href={"/sign-in"}>Connexion</Link>
    </Button>
  );
};

export default LoginSugBtn;
