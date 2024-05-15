"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { signIn } from "next-auth/react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSecure, setIsSecure] = useState<"password" | "text">("password");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async () => {
    if (email.replace(/ /g, "") === "" || password.replace(/ /g, "") === "") {
      toast({
        title: "Euh oh! Une erreur s'est produite!",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      const login = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });

      if (login?.error) {
        toast({
          title: "Oh! Une erreur s'est produite!",
          description: login.error,
          variant: "destructive",
        });
        setTimeout(() => setLoading(false), 1500);
        return;
      }
      setTimeout(() => setLoading(false), 1500);
      setTimeout(() => router.push("/"), 1500);
      toast({
        title: "Bienvenue!",
        description: "Vous êtes maintenant connecté!",
      });
    } catch (error) {
      const err = error as Error;
      toast({
        title: "Oh! Une erreur s'est produite!",
        description: err.message,
        variant: "destructive",
      });
      setTimeout(() => setLoading(false), 1500);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
      className="w-full flex flex-col items-center gap-6 px-4"
    >
      {/* email */}
      <div className="grid w-full max-w-xl items-center gap-1.5">
        <Label htmlFor="email" className="">
          Email
        </Label>
        <Input
          type="email"
          id="email"
          placeholder="Example@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          minLength={5}
          maxLength={40}
          required
          disabled={loading}
        />
      </div>

      {/* password */}
      <div className="grid w-full max-w-xl items-center gap-1.5">
        <div className="flex w-full items-center justify-between">
          <Label htmlFor="password" className="">
            Mot de passe
          </Label>

          {isSecure === "password" ? (
            <EyeOff
              className="cursor-pointer size-5 "
              onClick={() => setIsSecure("text")}
            />
          ) : (
            <Eye
              className="cursor-pointer size-5 "
              onClick={() => setIsSecure("password")}
            />
          )}
        </div>
        <Input
          type={isSecure}
          id="password"
          //   placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={5}
          maxLength={40}
          required
          disabled={loading}
        />
        <Link
          href={"/sign-up"}
          className=" text-xs lg:text-sm text-right text-balance"
        >
          <span>Mot de passe oublié?</span> <strong>Reinintialiser</strong>
        </Link>
      </div>
      {/* submit */}
      <Button
        type="submit"
        className="grid w-full max-w-xl items-center gap-1.5"
      >
        {loading ? "en cours..." : "Continuer"}
      </Button>

      <Link href={"/sign-up"} className=" text-xs lg:text-sm text-balance">
        <span>Vous n avez pas compte?</span> <strong>Inscrivez-vous</strong>
      </Link>
    </form>
  );
};
export default LoginForm;
