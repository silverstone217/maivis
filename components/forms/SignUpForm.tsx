"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import SelectOptions from "../SelectOptions";
import { Button } from "../ui/button";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

const options = [
  {
    title: "Je suis venu engager",
    value: "user",
  },
  {
    title: "Je suis pour travailler",
    value: "jobber",
  },
];
const label = "role";
const placeholder = "choisies ta situation...";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");

  const [isSecure, setIsSecure] = useState<"password" | "text">("password");

  const [loading, setLoading] = useState(false);

  return (
    <form
      action=""
      method="post"
      className="w-full flex flex-col items-center gap-6 px-4"
    >
      {/* names */}
      <div className="grid w-full max-w-xl items-center gap-1.5">
        <Label htmlFor="name" className="">
          Nom et Prenom
        </Label>
        <Input
          type="text"
          id="name"
          placeholder="Makese Sebastian"
          value={name}
          onChange={(e) => setName(e.target.value)}
          minLength={5}
          maxLength={40}
        />
      </div>

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
        />
      </div>

      {/* phone */}
      <div className="grid w-full max-w-xl items-center gap-1.5">
        <Label htmlFor="email" className="">
          Téléphone
        </Label>
        <Input
          type="text"
          id="phone"
          placeholder="999888777"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          minLength={9}
          maxLength={9}
        />
      </div>

      {/* role */}
      <div className="grid w-full max-w-xl items-center gap-1.5">
        <SelectOptions
          options={options}
          value={role}
          onChange={(value) => setRole(value)}
          label={label}
          placeholder={placeholder}
          loading={loading}
          setLoading={setLoading}
          required={true}
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
              className="cursor-pointer size-5"
              onClick={() => setIsSecure("text")}
            />
          ) : (
            <Eye
              className="cursor-pointer size-5"
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
        />
      </div>

      {/* password */}
      {/* <div className="grid w-full max-w-xl items-center gap-1.5">
        <Label htmlFor="cPassword" className="">
          Confirmer le mot de passe
        </Label>
        <Input
          type="password"
          id="cPassword"
          //   placeholder="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          minLength={5}
          maxLength={40}
        />
      </div> */}

      {/* submit */}
      <Button className="grid w-full max-w-xl items-center gap-1.5">
        Continuer
      </Button>

      <Link href={"/sign-in"} className="text-sm">
        <span>Vous avez deja un compte?</span> <strong>Connectez-vous</strong>
      </Link>
    </form>
  );
};

export default SignUpForm;
